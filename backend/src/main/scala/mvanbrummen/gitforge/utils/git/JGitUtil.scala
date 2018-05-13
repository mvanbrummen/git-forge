package mvanbrummen.gitforge.utils.git

import java.io.ByteArrayOutputStream

import mvanbrummen.gitforge.utils.FileUtil._
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.diff.DiffFormatter
import org.eclipse.jgit.lib.{Constants, ObjectId, Repository}
import org.eclipse.jgit.revwalk.DepthWalk.RevWalk
import org.eclipse.jgit.treewalk.filter.PathFilter
import org.eclipse.jgit.treewalk.{AbstractTreeIterator, CanonicalTreeParser, TreeWalk}

import scala.collection.JavaConverters._

trait GitUtil {
  def initRepository(account: String, name: String)

  def openRepository(account: String, name: String): Git

  def getRepositorySummary(repository: Repository): GitRepositorySummary

  def getAllCommits(repository: Repository): Seq[Commit]

  def getAllCommitsByRef(repository: Repository, ref: String): Seq[Commit]

  def listBranches(repository: Repository): Seq[Branch]

  def isRepositoryClean(repository: Repository): Boolean

  def listDirectory(repository: Repository): Seq[GitDirectoryItem]

  def listDirectory(repository: Repository, path: String): Seq[GitDirectoryItem]

  def getReadmeContents(repository: Repository): Option[String]

  def getFileContents(repository: Repository, filePath: String): Option[String]

  def diffCommits(repository: Repository, oldSha: String, newSha: String): Seq[CommitDiff]
}

object JGitUtil extends GitUtil {

  def initRepository(account: String, name: String) = {
    val git = Git.init().setDirectory(repositoryDir(account, name)).call()
    assert(git.getRepository.getRef(Constants.HEAD) != null)
    assert(git.status().call().isClean)
  }

  def openRepository(account: String, name: String): Git = Git.open(gitDir(account, name))

  def getRepositorySummary(repository: Repository): GitRepositorySummary = {
    val isClean = isRepositoryClean(repository)
    val dirContents = listDirectory(repository)
    val commits = getAllCommits(repository)
    val totalCommits = commits.size
    val lastCommit = commits.headOption
    val branches = listBranches(repository)
    val readme = getReadmeContents(repository)

    GitRepositorySummary(isClean, branches, totalCommits, lastCommit, dirContents, readme)
  }

  def getAllCommits(repository: Repository): Seq[Commit] = {
    if (isRepositoryClean(repository)) return Seq.empty

    val git = new Git(repository)
    val revCommits = git.log().all().call()

    revCommits.asScala
      .map(c => Commit(
        c.getName,
        c.getCommitterIdent.getName,
        c.getShortMessage,
        c.getCommitTime,
        c.getParents.map(_.getName)
      ))
      .toSeq
  }

  def diffCommits(repository: Repository, oldSha: String, newSha: String): Seq[CommitDiff] = {
    val oldTreeParser = prepareTreeParser(repository, oldSha)
    val newTreeParser = prepareTreeParser(repository, newSha)

    val git = new Git(repository)

    val out = new ByteArrayOutputStream()
    val df = new DiffFormatter(out)
    df.setRepository(git.getRepository)

    val diffs = df.scan(oldTreeParser, newTreeParser)

    diffs.asScala
      .map { d =>
        df.format(df.toFileHeader(d))

        CommitDiff(d.getNewPath, out.toString())
      }
  }

  def getAllCommitsByRef(repository: Repository, ref: String): Seq[Commit] = {
    if (isRepositoryClean(repository)) return Seq.empty

    val branchName = s"refs/heads/$ref"

    val git = new Git(repository)
    val revCommits = git.log().add(repository.resolve(branchName)).call()

    revCommits.asScala
      .map(c => Commit(
        c.getName,
        c.getCommitterIdent.getName,
        c.getShortMessage,
        c.getCommitTime,
        c.getParents.map(_.getName)
      ))
      .toSeq
  }

  def listBranches(repository: Repository): Seq[Branch] = {
    val git = new Git(repository)
    val branchRefs = git.branchList().call()

    branchRefs.asScala
      .map(b => Branch(b.getName, b.getName.replace("refs/heads/", ""), b.getObjectId.getName))
  }

  def isRepositoryClean(repository: Repository): Boolean = repository.getAllRefs.isEmpty

  def listDirectory(repository: Repository): Seq[GitDirectoryItem] = {
    if (isRepositoryClean(repository)) return Seq.empty

    val ref = repository.getRef(Constants.HEAD)
    val revWalk = new RevWalk(repository, 1)
    val commit = revWalk.parseCommit(ref.getObjectId)
    val tree = commit.getTree

    val treeWalk = new TreeWalk(repository)
    treeWalk.addTree(tree)
    treeWalk.setRecursive(false)

    Iterator.continually(treeWalk.next())
      .takeWhile(b => b)
      .map { _ => GitDirectoryItem(treeWalk.isSubtree, treeWalk.getPathString) }
      .toSeq
      .sortBy(_.isDir)
      .reverse
  }

  def listDirectory(repository: Repository, path: String): Seq[GitDirectoryItem] = {
    val params = path.split("/")

    val ref = repository.getRef(Constants.HEAD)
    val revWalk = new RevWalk(repository, 100)
    val commit = revWalk.parseCommit(ref.getObjectId)
    val tree = commit.getTree

    val treeWalk = new TreeWalk(repository)
    treeWalk.addTree(tree)
    treeWalk.setRecursive(false)
    treeWalk.setFilter(PathFilter.create(path))

    // TODO is there a way to avoid mutable Seq?
    var items = scala.collection.mutable.Seq.empty[GitDirectoryItem]

    Iterator.continually(treeWalk.next())
      .takeWhile(b => b)
      .foreach { _ =>
        val relPath = treeWalk.getPathString.replace(s"$path/", "")
        if (!relPath.contains("/") && !relPath.equalsIgnoreCase(path) && !params.contains(relPath)) {
          items = items :+ GitDirectoryItem(treeWalk.isSubtree, relPath)
        }

        if (treeWalk.isSubtree) treeWalk.enterSubtree()
      }

    items
      .sortBy(_.isDir)
      .reverse
  }

  def getReadmeContents(repository: Repository): Option[String] = {
    if (isRepositoryClean(repository)) return None

    val ref = repository.getRef(Constants.HEAD)
    val revWalk = new RevWalk(repository, 1)
    val commit = revWalk.parseCommit(ref.getObjectId)
    val tree = commit.getTree

    val treeWalk = new TreeWalk(repository)
    treeWalk.addTree(tree)
    treeWalk.setRecursive(false)
    treeWalk.setFilter(PathFilter.create("README.md"))

    if (!treeWalk.next()) return None

    val objectId = treeWalk.getObjectId(0)
    val loader = repository.open(objectId)

    Some(new String(loader.getBytes))
  }

  def getFileContents(repository: Repository, filePath: String): Option[String] = {
    val ref = repository.getRef(Constants.HEAD)
    val revWalk = new RevWalk(repository, 100)
    val commit = revWalk.parseCommit(ref.getObjectId)
    val tree = commit.getTree

    val treeWalk = new TreeWalk(repository)
    treeWalk.addTree(tree)
    treeWalk.setRecursive(false)
    treeWalk.setFilter(PathFilter.create(filePath))

    var contents: Option[String] = None

    Iterator.continually(treeWalk.next())
      .takeWhile(b => b && contents.isEmpty)
      .foreach { _ =>
        if (treeWalk.getPathString.equalsIgnoreCase(filePath)) {
          val objectId = treeWalk.getObjectId(0)
          val loader = repository.open(objectId)

          contents = Some(new String(loader.getBytes))
        }

        if (treeWalk.isSubtree) treeWalk.enterSubtree()
      }

    contents
  }

  private def prepareTreeParser(repository: Repository, objectId: String): AbstractTreeIterator = {
    val walk = new RevWalk(repository, 1)

    val commit = walk.parseCommit(ObjectId.fromString(objectId))
    val tree = walk.parseTree(commit.getTree.getId)

    val treeParser = new CanonicalTreeParser()
    val reader = repository.newObjectReader()
    treeParser.reset(reader, tree.getId)

    walk.dispose()

    treeParser
  }
}

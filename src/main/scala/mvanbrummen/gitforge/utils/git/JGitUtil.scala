package mvanbrummen.gitforge.utils.git

import mvanbrummen.gitforge.utils.FileUtil._
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.lib.{Constants, Repository}
import org.eclipse.jgit.revwalk.DepthWalk.RevWalk
import org.eclipse.jgit.treewalk.TreeWalk

import scala.collection.JavaConverters._

object JGitUtil {

  def initRepository(account: String, name: String) = {
    val git = Git.init().setDirectory(repositoryDir(account, name)).call()
    assert(git.getRepository.getRef(Constants.HEAD) != null)
    assert(git.status().call().isClean)
  }

  def openRepository(account: String, name: String): Git = Git.open(gitDir(account, name))

  def getRepositorySummary(repository: Repository): RepositorySummary = {
    val isClean = isRepositoryClean(repository)
    val dirContents = listDirectory(repository)
    val commits = getAllCommits(repository)
    val totalCommits = commits.size
    val lastCommit = commits.headOption
    val branches = listBranches(repository)

    RepositorySummary(isClean, branches, totalCommits, lastCommit, dirContents)
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
        c.getCommitTime
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

    val ref = repository.getRef("HEAD")
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
  }

}

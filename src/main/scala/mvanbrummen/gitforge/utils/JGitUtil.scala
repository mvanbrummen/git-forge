package mvanbrummen.gitforge.utils

import mvanbrummen.gitforge.utils.FileUtil._
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.lib.{ Constants, Repository }
import org.eclipse.jgit.revwalk.DepthWalk.RevWalk
import org.eclipse.jgit.treewalk.TreeWalk

object JGitUtil {

  def initRepository(account: String, name: String) = {
    val git = Git.init().setDirectory(repositoryDir(account, name)).call()
    assert(git.getRepository.getRef(Constants.HEAD) != null)
    assert(git.status().call().isClean)
  }

  def openRepository(account: String, name: String): Git = Git.open(gitDir(account, name))

  def listDirectory(repository: Repository): Seq[GitDirectoryItem] = {
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

  case class GitDirectoryItem(isDir: Boolean, path: String)

}

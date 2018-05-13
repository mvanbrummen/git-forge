package mvanbrummen.gitforge.core.repository

import java.util.UUID

import mvanbrummen.gitforge.core.{ AccountUUID, Repository, RepositorySummary }
import mvanbrummen.gitforge.utils.git._
import org.eclipse.jgit.errors.RepositoryNotFoundException

import scala.concurrent.{ ExecutionContext, Future }

class RepositoryService(repositoryRepository: RepositoryRepository, gitUtil: GitUtil)(implicit ec: ExecutionContext) {

  def findRepositoriesByAccount(name: String): Future[Seq[Repository]] = {
    repositoryRepository.findAll(name)
  }

  def getRepositorySummary(account: String, name: String): Future[RepositorySummary] = {
    val git = JGitUtil.openRepository(account, name)
    val gitSummary = gitUtil.getRepositorySummary(git.getRepository)

    repositoryRepository.find(account, name).map {
      case Some(repo) => RepositorySummary(repo.description, gitSummary)
      case None => throw new RepositoryNotFoundException(s"Could not find repo: /$account/$name")
    }
  }

  def saveRepository(account: AccountUUID, username: String, name: String, description: Option[String]): Future[Repository] = {
    gitUtil.initRepository(username, name)
    repositoryRepository.save(Repository(UUID.randomUUID(), account, name, description))
  }

  def getRepositoryItemsByPath(account: String, name: String, path: String): Future[Seq[GitDirectoryItem]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.listDirectory(git.getRepository, path)
  }

  def getBlobContentsByPath(account: String, name: String, path: String): Future[Option[String]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.getFileContents(git.getRepository, path)
  }

  def getAllCommitsByRef(account: String, name: String, ref: String): Future[Seq[Commit]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.getAllCommitsByRef(git.getRepository, ref)
  }

  def diffCommits(account: String, name: String, oldSha: String, newSha: String): Future[Seq[CommitDiff]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.diffCommits(git.getRepository, oldSha, newSha)
  }
}

package mvanbrummen.gitforge.core.repository

import java.util.UUID

import mvanbrummen.gitforge.core.{ AccountUUID, Repository }
import mvanbrummen.gitforge.utils.git.{ GitDirectoryItem, GitUtil, JGitUtil, RepositorySummary }

import scala.concurrent.{ ExecutionContext, Future }

class RepositoryService(repositoryRepository: RepositoryRepository, gitUtil: GitUtil)(implicit ec: ExecutionContext) {

  def findRepositoriesByAccount(name: String): Future[Seq[Repository]] = {
    repositoryRepository.findAll(name)
  }

  def getRepositorySummary(account: String, name: String): Future[RepositorySummary] = {
    Future {
      val git = JGitUtil.openRepository(account, name)

      gitUtil.getRepositorySummary(git.getRepository)
    }
  }

  def saveRepository(account: AccountUUID, username: String, name: String, description: Option[String]): Future[Repository] = {
    gitUtil.initRepository(username, name)
    repositoryRepository.save(Repository(UUID.randomUUID(), account, name, description))
  }

  def getRepositoryItemsByPath(account: String, name: String, path: String): Future[Seq[GitDirectoryItem]] = {
    Future {
      val git = gitUtil.openRepository(account, name)

      gitUtil.listDirectory(git.getRepository, path)
    }
  }

  def getBlobContentsByPath(account: String, name: String, path: String): Future[Option[String]] = {
    Future {
      val git = gitUtil.openRepository(account, name)

      gitUtil.getFileContents(git.getRepository, path)
    }
  }
}

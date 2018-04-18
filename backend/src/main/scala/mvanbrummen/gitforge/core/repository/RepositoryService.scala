package mvanbrummen.gitforge.core.repository

import java.util.UUID

import mvanbrummen.gitforge.core.{AccountUUID, Repository}
import mvanbrummen.gitforge.utils.git.{GitDirectoryItem, JGitUtil, RepositorySummary}

import scala.concurrent.{ExecutionContext, Future}

class RepositoryService(repositoryRepository: RepositoryRepository)(implicit ec: ExecutionContext) {

  def findRepositoriesByAccount(name: String): Future[Seq[Repository]] = {
    repositoryRepository.findAll(name)
  }

  def getRepositorySummary(account: String, name: String): Future[RepositorySummary] = {
    Future {
      val git = JGitUtil.openRepository(account, name)

      JGitUtil.getRepositorySummary(git.getRepository)
    }
  }

  def saveRepository(account: AccountUUID, username: String, name: String, description: Option[String]): Future[Repository] = {
    JGitUtil.initRepository(username, name)
    repositoryRepository.save(Repository(UUID.randomUUID(), account, name, description))
  }

  def getRepositoryItemsByPath(account: String, name: String, path: String): Future[Seq[GitDirectoryItem]] = {
    Future {
      val git = JGitUtil.openRepository(account, name)

      JGitUtil.listDirectory(git.getRepository, path)
    }
  }

  def getBlobContentsByPath(account: String, name: String, path: String): Future[Option[String]] = {
    Future {
      val git = JGitUtil.openRepository(account, name)

      JGitUtil.getFileContents(git.getRepository, path)
    }
  }
}

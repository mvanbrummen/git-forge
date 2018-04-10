package mvanbrummen.gitforge.core.repository

import java.util.UUID

import mvanbrummen.gitforge.core.{ AccountUUID, Repository }
import mvanbrummen.gitforge.utils.JGitUtil
import mvanbrummen.gitforge.utils.JGitUtil.GitDirectoryItem

import scala.concurrent.{ ExecutionContext, Future }

class RepositoryService(repositoryRepository: RepositoryRepository)(implicit ec: ExecutionContext) {

  def findRepositoriesByAccount(name: String): Future[Seq[Repository]] = {
    repositoryRepository.findAll(name)
  }

  def listDirectory(account: String, name: String): Seq[GitDirectoryItem] = {
    val git = JGitUtil.openRepository(account, name)

    JGitUtil.listDirectory(git.getRepository)
  }

  def saveRepository(account: AccountUUID, username: String, name: String, description: Option[String]): Future[Repository] = {
    JGitUtil.initRepository(username, name)
    repositoryRepository.save(Repository(UUID.randomUUID(), account, name, description))
  }
}

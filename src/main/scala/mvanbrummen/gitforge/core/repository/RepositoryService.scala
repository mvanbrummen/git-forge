package mvanbrummen.gitforge.core.repository

import java.util.UUID

import mvanbrummen.gitforge.core.{ AccountUUID, Repository }

import scala.concurrent.{ ExecutionContext, Future }

class RepositoryService(repositoryRepository: RepositoryRepository)(implicit ec: ExecutionContext) {

  def findRepositoriesByAccount(name: String): Future[Seq[Repository]] = {
    repositoryRepository.findAll(name)
  }

  def saveRepository(account: AccountUUID, name: String, description: Option[String]): Future[Repository] = {
    repositoryRepository.save(Repository(UUID.randomUUID(), account, name, description))
  }
}

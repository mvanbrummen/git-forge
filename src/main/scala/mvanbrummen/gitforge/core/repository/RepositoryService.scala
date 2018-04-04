package mvanbrummen.gitforge.core.repository

import mvanbrummen.gitforge.core.{Account, Repository}

import scala.concurrent.{ExecutionContext, Future}

class RepositoryService()(implicit ec: ExecutionContext) {

  private val account = Account("mvanbrummen", "michaelvanbrummen@gmail.com")
  private val account2 = Account("waldo", "waldo@gmail.com")
  private val repos = List(
    Repository(account, "avro-schema-validator", None),
    Repository(account, "git-forge", Some("Git hosting made for developers")),
    Repository(account, "shite-code", Some("Shite code daily")),
    Repository(account2, "avro-npm", None)
  )

  def findRepositoriesByAccount(userName: String): Future[List[Repository]] = {
    Future {
      repos.filter(_.account.username.equalsIgnoreCase(userName))
    }
  }

}

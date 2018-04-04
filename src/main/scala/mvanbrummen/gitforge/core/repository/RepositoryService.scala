package mvanbrummen.gitforge.core.repository

import mvanbrummen.gitforge.core.Repository

import scala.concurrent.{ ExecutionContext, Future }

class RepositoryService()(implicit ec: ExecutionContext) {

  private val repos = List(
    Repository(null, "avro-schema-validator", None),
    Repository(null, "git-forge", Some("Git hosting made for developers")),
    Repository(null, "shite-code", Some("Shite code daily")),
    Repository(null, "avro-npm", None)
  )

  def findRepositoriesByAccount(userName: String): Future[List[Repository]] = {
    Future {
      repos.filter(_.account.username.equalsIgnoreCase(userName))
    }
  }

}

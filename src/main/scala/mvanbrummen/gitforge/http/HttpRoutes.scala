package mvanbrummen.gitforge.http

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mvanbrummen.gitforge.core.auth.AccountService
import mvanbrummen.gitforge.core.repository.RepositoryService
import mvanbrummen.gitforge.http.routes.{ AccountRoute, HealthRoute, RepositoryRoute }

import scala.concurrent.ExecutionContext

class HttpRoutes(repositoryService: RepositoryService, accountService: AccountService)(implicit ec: ExecutionContext) {

  private val healthRoute = new HealthRoute
  private val repositoryRoute = new RepositoryRoute(repositoryService)
  private val accountRoute = new AccountRoute(accountService)

  lazy val routes: Route = repositoryRoute.routes ~ healthRoute.routes ~ accountRoute.routes

}

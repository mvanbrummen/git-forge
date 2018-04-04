package mvanbrummen.gitforge.http.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._
import mvanbrummen.gitforge.core.repository.RepositoryService

import scala.concurrent.ExecutionContext

class RepositoryRoute(repositoryService: RepositoryService)(implicit ec: ExecutionContext) {

  lazy val routes: Route =
    get {
      path("repository" / Segment) { username =>
        onComplete(repositoryService.findRepositoriesByAccount(username)) { repos =>
          complete(repos)
        }
      }
    }
}

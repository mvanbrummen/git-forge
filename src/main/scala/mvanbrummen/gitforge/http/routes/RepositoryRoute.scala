package mvanbrummen.gitforge.http.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._
import mvanbrummen.gitforge.core.repository.RepositoryService
import mvanbrummen.gitforge.utils.SecurityDirectives

import scala.concurrent.ExecutionContext

class RepositoryRoute(
    repositoryService: RepositoryService,
    secretKey: String
)(implicit ec: ExecutionContext) {

  import SecurityDirectives._

  lazy val routes: Route =
    pathPrefix("repository") {
      pathEndOrSingleSlash {
        post {
          authenticate(secretKey) { accountId =>
            entity(as[Repository]) { repo =>
              complete(repositoryService.saveRepository(accountId, repo.name, repo.description))
            }
          }
        }
      } ~
        get {
          path(Segment) { username =>
            onComplete(repositoryService.findRepositoriesByAccount(username)) { repos =>
              complete(repos)
            }
          }
        }
    }

  private case class Repository(name: String, description: Option[String])

}

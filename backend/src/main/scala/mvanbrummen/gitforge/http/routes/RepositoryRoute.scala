package mvanbrummen.gitforge.http.routes

import java.nio.file.Paths

import akka.http.scaladsl.model.{ContentTypes, HttpEntity, StatusCodes}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.stream.scaladsl.FileIO
import ch.megard.akka.http.cors.scaladsl.CorsDirectives._
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._
import mvanbrummen.gitforge.core.repository.RepositoryService
import mvanbrummen.gitforge.utils.SecurityDirectives

import scala.concurrent.ExecutionContext
import scala.util.Success

class RepositoryRoute(
                       repositoryService: RepositoryService,
                       secretKey: String
                     )(implicit ec: ExecutionContext) {

  private val CHUNK_SIZE = 100000

  import SecurityDirectives._

  lazy val routes: Route =
    cors() {
      pathPrefix("repository") {
        pathEndOrSingleSlash {
          post {
            authenticate(secretKey) { token =>
              entity(as[Repository]) { repo =>
                complete(repositoryService.saveRepository(token.id, token.username, repo.name, repo.description))
              }
            }
          }
        } ~
          pathPrefix(Segment / Segment) {
            case (account, name) =>
              path("summary") {
                get {
                  onComplete(repositoryService.getRepositorySummary(account, name)) { summary =>
                    complete(summary)
                  }
                }
              } ~
                path("blob" / Segments) { paths =>
                  get {
                    onComplete(repositoryService.getRepositoryItemsByPath(account, name, paths.mkString("/"))) { items =>
                      complete(items)
                    }
                  }

                } ~
                path("contents" / Segments) { paths =>
                  get {
                    onComplete(repositoryService.getBlobContentsByPath(account, name, paths.mkString("/"))) { contents =>
                      complete(contents)
                    }
                  }
                } ~
                path("commits" / Segment) { branch =>
                  get {
                    onComplete(repositoryService.getAllCommitsByRef(account, name, branch)) { contents =>
                      complete(contents)
                    }
                  }
                } ~
                path("diff") {
                  parameters('oldSha, 'newSha) { (oldSha, newSha) =>
                    get {
                      onComplete(repositoryService.diffCommits(account, name, oldSha, newSha)) { diffs =>
                        complete(diffs)
                      }
                    }
                  }
                } ~
                path("refs") {
                  get {
                    onComplete(repositoryService.getRefs(account, name)) { refs =>
                      complete(refs)
                    }
                  }
                } ~
                path("zip" / Segment) { fileName =>
                  get {
                    onComplete(repositoryService.getZip(account, name, fileName)) {
                      case Success(zipFilePath) => complete(HttpEntity(ContentTypes.`application/octet-stream`,
                        FileIO.fromPath(Paths.get(zipFilePath), CHUNK_SIZE)
                      ))
                      case _ => complete(StatusCodes.InternalServerError)
                    }
                  }
                }
          } ~
          path(Segment) { username =>
            get {
              onComplete(repositoryService.findRepositoriesByAccount(username)) { repos =>
                complete(repos)
              }
            }
          }
      }
    }

  private case class Repository(name: String, description: Option[String])

}

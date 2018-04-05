package mvanbrummen.gitforge.http.routes

import akka.http.scaladsl.marshalling.ToResponseMarshallable
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._
import io.circe.syntax._
import mvanbrummen.gitforge.core.auth.AccountService

import scala.concurrent.ExecutionContext

class AccountRoute(accountService: AccountService)(implicit ec: ExecutionContext) {

  lazy val routes: Route =
    path("account") {
      pathEndOrSingleSlash {
        post {
          entity(as[Account]) { account =>
            complete(Created -> accountService.signup(account.username, account.email, account.password))
          }
        }
      }
    } ~
      path("auth") {
        pathEndOrSingleSlash {
          post {
            entity(as[UserAuth]) { auth =>
              complete(
                accountService.auth(auth.username, auth.password).map[ToResponseMarshallable] {
                  case Some(token) => OK -> token
                  case None => Unauthorized -> None.asJson
                }
              )
            }
          }
        }
      }

  private case class Account(username: String, email: String, password: String)

  private case class UserAuth(username: String, password: String)

}


package mvanbrummen.gitforge.http.routes

import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import mvanbrummen.gitforge.core.auth.AccountService
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import io.circe.generic.auto._

import scala.concurrent.ExecutionContext

class AccountRoute(accountService: AccountService)(implicit ec: ExecutionContext) {

  lazy val routes: Route =
    post {
      path("account") {
        entity(as[Account]) { account =>
          complete(Created -> accountService.signup(account.username, account.email, account.password))
        }
      }
    }

  private case class Account(username: String, email: String, password: String)

}


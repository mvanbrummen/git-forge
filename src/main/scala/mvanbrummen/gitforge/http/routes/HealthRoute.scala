package mvanbrummen.gitforge.http.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class HealthRoute {

  lazy val routes: Route =
    get {
      path("health") {
        complete(Map("status" -> "GREEN"))
      }
    }

}

package mvanbrummen.gitforge.http.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

class HealthRoute {

  lazy val routes: Route =
    get {
      path("health") {
        complete("GREEN")
      }
    }

}

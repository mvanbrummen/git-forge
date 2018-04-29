package mvanbrummen.gitforge

import akka.actor.ActorSystem
import mvanbrummen.gitforge.utils.Config
import mvanbrummen.gitforge.utils.database.DatabaseConnection

trait DatabaseIntegration {

  implicit val system: ActorSystem = ActorSystem("gitForge")
  implicit val executionContext = system.dispatcher

  val config = Config.load()

  val db = new DatabaseConnection(
    config.db.url,
    config.db.user,
    config.db.password
  )
}

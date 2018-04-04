package mvanbrummen.gitforge

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import com.typesafe.config.ConfigFactory
import mvanbrummen.gitforge.core.repository.RepositoryService
import mvanbrummen.gitforge.http.HttpRoutes

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object Boot extends App {

  def startApplication() = {
    implicit val system: ActorSystem = ActorSystem("gitForge")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val executionContext = system.dispatcher

    val config = ConfigFactory.load()
    val host = config.getString("http.interface")
    val port = config.getInt("http.port")

    val repositoryService = new RepositoryService()
    val applicationRoutes = new HttpRoutes(repositoryService)

    val bindingFuture = Http().bindAndHandle(applicationRoutes.routes, host, port)

    println(s"Server online at $host:$port ...")

    Await.result(system.whenTerminated, Duration.Inf)
  }

  startApplication()
}

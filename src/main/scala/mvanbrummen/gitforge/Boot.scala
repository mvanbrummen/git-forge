package mvanbrummen.gitforge

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import mvanbrummen.gitforge.core.repository.RepositoryService
import mvanbrummen.gitforge.http.HttpRoutes
import mvanbrummen.gitforge.utils.Config

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object Boot extends App {

  def startApplication() = {
    implicit val system: ActorSystem = ActorSystem("gitForge")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val executionContext = system.dispatcher

    val config = Config.load()

    val repositoryService = new RepositoryService()
    val applicationRoutes = new HttpRoutes(repositoryService)

    val bindingFuture = Http().bindAndHandle(applicationRoutes.routes, config.http.interface, config.http.port)

    println(s"Server online at ${config.http.interface + ":" + config.http.port} ...")

    Await.result(system.whenTerminated, Duration.Inf)
  }

  startApplication()
}

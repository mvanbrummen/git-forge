package mvanbrummen.gitforge

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import mvanbrummen.gitforge.core.auth.{AccountRepository, AccountService}
import mvanbrummen.gitforge.core.repository.{RepositoryRepository, RepositoryService}
import mvanbrummen.gitforge.http.HttpRoutes
import mvanbrummen.gitforge.ssh.SshServer
import mvanbrummen.gitforge.utils.database.{DatabaseConnection, DatabaseMigration}
import mvanbrummen.gitforge.utils.git.JGitUtil
import mvanbrummen.gitforge.utils.{Config, FileUtil}
import org.slf4j.LoggerFactory

import scala.concurrent.Await
import scala.concurrent.duration.Duration

object Boot extends App {
  private val logger = LoggerFactory.getLogger(getClass.getName)

  def startApplication() = {
    implicit val system: ActorSystem = ActorSystem("gitForge")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val executionContext = system.dispatcher

    val config = Config.load()

    new DatabaseMigration(
      config.db.url,
      config.db.user,
      config.db.password
    ).migrateDatabaseSchema()

    val databaseConnector = new DatabaseConnection(
      config.db.url,
      config.db.user,
      config.db.password
    )

    val accountRepository = new AccountRepository(databaseConnector)
    val repositoryRepository = new RepositoryRepository(databaseConnector)

    val accountSevice = new AccountService(accountRepository, config.jwt.secret)
    val repositoryService = new RepositoryService(repositoryRepository, JGitUtil)
    val httpRoutes = new HttpRoutes(repositoryService, accountSevice, config.jwt.secret)

    val gitHomeDir = FileUtil.homeDir

    new SshServer(8008, rootDir = gitHomeDir.getCanonicalPath).start()

    val bindingFuture = Http().bindAndHandle(httpRoutes.routes, config.http.interface, config.http.port)

    logger.info(s"Server online at ${config.http.interface + ":" + config.http.port} ...")

    Await.result(system.whenTerminated, Duration.Inf)
  }

  startApplication()
}

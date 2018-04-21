package mvanbrummen.gitforge.core.repository

import mvanbrummen.gitforge.core.Repository
import mvanbrummen.gitforge.core.auth.AccountTable
import mvanbrummen.gitforge.utils.database.DatabaseConnection

import scala.concurrent.{ExecutionContext, Future}

class RepositoryRepository(val databaseConnection: DatabaseConnection)(implicit ec: ExecutionContext) extends RepositoryTable with AccountTable {

  import databaseConnection._
  import databaseConnection.profile.api._

  def findAll(name: String): Future[Seq[Repository]] = {
    val q = for {
      u <- accounts.filter(_.username === name)
      r <- repositories.filter(_.accountId === u.id)
    } yield r

    db.run(q.result)
  }

  def find(name: String, repoName: String): Future[Option[Repository]] = {
    db.run(
      (for {
        u <- accounts.filter(_.username === name)
        r <- repositories.filter(r => r.accountId === u.id && r.name === repoName)
      } yield r)
        .result.headOption
    )
  }

  def save(repository: Repository): Future[Repository] = {
    db.run(repositories.insertOrUpdate(repository)).map(_ => repository)
  }
}

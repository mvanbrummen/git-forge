package mvanbrummen.gitforge.core.auth

import mvanbrummen.gitforge.core.Account
import mvanbrummen.gitforge.utils.database.DatabaseConnection

import scala.concurrent.{ ExecutionContext, Future }

class AccountRepository(val databaseConnection: DatabaseConnection)(implicit ec: ExecutionContext) extends AccountTable {

  import databaseConnection._
  import databaseConnection.profile.api._

  def findAccount(username: String): Future[Option[Account]] = {
    db.run(accounts.filter(_.username === username).result.headOption)
  }

  def saveAccount(account: Account): Future[Account] = {
    db.run(accounts.insertOrUpdate(account)).map(_ => account)
  }

}

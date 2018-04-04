package mvanbrummen.gitforge.core.auth

import mvanbrummen.gitforge.core.{ Account, AccountUUID }
import mvanbrummen.gitforge.utils.DatabaseConnection

private[auth] trait AccountTable {

  protected val databaseConnection: DatabaseConnection
  import databaseConnection.profile.api._

  class AccountSchema(tag: Tag) extends Table[Account](tag, "account") {
    def id = column[AccountUUID]("id", O.PrimaryKey)
    def username = column[String]("username")
    def password = column[String]("password")
    def email = column[String]("email_address")

    def * = (id, username, email, password) <> ((Account.apply _).tupled, Account.unapply)
  }

  protected val accounts = TableQuery[AccountSchema]
}

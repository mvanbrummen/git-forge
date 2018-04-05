package mvanbrummen.gitforge.core.repository

import mvanbrummen.gitforge.core.{ Account, AccountUUID, Repository, RepositoryUUID }
import mvanbrummen.gitforge.utils.DatabaseConnection

trait RepositoryTable {

  protected val databaseConnection: DatabaseConnection

  import databaseConnection.profile.api._

  class RepositorySchema(tag: Tag) extends Table[Repository](tag, "repository") {
    def id = column[RepositoryUUID]("id", O.PrimaryKey)

    def accountId = column[AccountUUID]("account_id")

    def name = column[String]("name")

    def description = column[Option[String]]("description")

    def * = (id, accountId, name, description) <> ((Repository.apply _).tupled, Repository.unapply)
  }

  protected val repositories = TableQuery[RepositorySchema]

}

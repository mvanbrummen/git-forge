package mvanbrummen.gitforge.utils.database

import org.flywaydb.core.Flyway

class DatabaseMigration(
    jdbcUrl: String,
    dbUser: String,
    dbPassword: String
) {

  private val flyway = new Flyway()
  flyway.setDataSource(jdbcUrl, dbUser, dbPassword)
  flyway.setLocations("classpath:db/migration", "classpath:db/test") // TODO move to config

  def migrateDatabaseSchema(): Unit = flyway.migrate()

  def dropDatabase(): Unit = flyway.clean()

}

package mvanbrummen.gitforge.utils

import com.zaxxer.hikari.{ HikariConfig, HikariDataSource }

class DatabaseConnection(jdbcUrl: String, dbUser: String, dbPassword: String) {

  val profile = slick.jdbc.PostgresProfile
  import profile.api._

  private val dataSource = {
    val config = new HikariConfig()
    config.setJdbcUrl(jdbcUrl)
    config.setUsername(dbUser)
    config.setPassword(dbPassword)

    new HikariDataSource(config)
  }

  val db = Database.forDataSource(dataSource, None)
  db.createSession()

}

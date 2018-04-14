package mvanbrummen.gitforge.utils

import pureconfig.loadConfig

case class Config(http: Http, jwt: JWT, db: Db)

case class Http(interface: String, port: Int)

case class Db(url: String, user: String, password: String)

case class JWT(secret: String)

object Config {
  def load() =
    loadConfig[Config] match {
      case Right(config) => config
      case Left(error) => throw new RuntimeException(s"Cannot read config: \n ${error.toList.mkString("\n")}")
    }
}


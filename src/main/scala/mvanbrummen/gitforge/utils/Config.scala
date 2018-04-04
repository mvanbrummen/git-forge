package mvanbrummen.gitforge.utils

import pureconfig.loadConfig

case class Config(http: Http)

case class Http(interface: String, port: Int)

object Config {
  def load() =
    loadConfig[Config] match {
      case Right(config) => config
      case Left(error) => throw new RuntimeException(s"Cannot read config: \n ${error.toList.mkString("\n")}")
    }

}


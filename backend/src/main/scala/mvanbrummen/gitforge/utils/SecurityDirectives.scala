package mvanbrummen.gitforge.utils

import akka.http.scaladsl.server.Directive1
import akka.http.scaladsl.server.directives.{ BasicDirectives, HeaderDirectives, RouteDirectives }
import io.circe.generic.auto._
import io.circe.parser._
import mvanbrummen.gitforge.core.TokenClaims
import pdi.jwt._

object SecurityDirectives {

  import BasicDirectives._
  import HeaderDirectives._
  import RouteDirectives._

  def authenticate(secretKey: String): Directive1[TokenClaims] = {
    headerValueByName("Token")
      .map(Jwt.decodeRaw(_, secretKey, Seq(JwtAlgorithm.HS256)))
      .map(_.toOption.flatMap(decode[TokenClaims](_).toOption))
      .flatMap {
        case Some(result) =>
          provide(result)
        case None =>
          reject
      }
  }
}

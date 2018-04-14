package mvanbrummen.gitforge.core.auth

import java.util.UUID

import com.github.t3hnar.bcrypt._
import io.circe.generic.auto._
import io.circe.syntax._
import mvanbrummen.gitforge.core.{ Account, TokenClaims, TokenResponse }
import mvanbrummen.gitforge.utils.MonadTransformer._
import pdi.jwt.{ Jwt, JwtAlgorithm }

import scala.concurrent.{ ExecutionContext, Future }

class AccountService(
    accountRepository: AccountRepository,
    secretKey: String
)(implicit ec: ExecutionContext) {

  def auth(username: String, password: String): Future[Option[TokenResponse]] = {
    accountRepository
      .findAccount(username)
      .filterT(a => password.isBcrypted(a.password))
      .mapT(a => encodeJwt(TokenClaims(a.id, a.username, a.emailAddress)))
  }

  def signup(username: String, email: String, password: String): Future[TokenResponse] = {
    accountRepository
      .saveAccount(Account(UUID.randomUUID(), username, email, password.bcrypt))
      .map(a => encodeJwt(TokenClaims(a.id, a.username, a.emailAddress)))
  }

  private def encodeJwt(claims: TokenClaims): TokenResponse = {
    TokenResponse(Jwt.encode(claims.asJson.noSpaces, secretKey, JwtAlgorithm.HS256))
  }
}

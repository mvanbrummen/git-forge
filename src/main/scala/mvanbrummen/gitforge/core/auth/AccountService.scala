package mvanbrummen.gitforge.core.auth

import java.util.UUID

import com.github.t3hnar.bcrypt._
import io.circe.generic.auto._
import io.circe.syntax._
import mvanbrummen.gitforge.core.{ Account, TokenClaims, UserAuthToken }
import pdi.jwt.{ Jwt, JwtAlgorithm }

import scala.concurrent.{ ExecutionContext, Future }

class AccountService(
  accountRepository: AccountRepository,
    secretKey: String
)(implicit ec: ExecutionContext) {

  def signup(username: String, email: String, password: String): Future[UserAuthToken] = {
    accountRepository.saveAccount(Account(UUID.randomUUID(), username, email, password.bcrypt))
      .map(account => encodeJwt(TokenClaims(account.id, account.emailAddress)))
  }

  private def encodeJwt(claims: TokenClaims): UserAuthToken = {
    Jwt.encode(claims.asJson.noSpaces, secretKey, JwtAlgorithm.HS256)
  }
}

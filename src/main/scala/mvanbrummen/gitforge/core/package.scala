package mvanbrummen.gitforge

import java.util.UUID

package object core {

  type AccountUUID = UUID
  type UserAuthToken = String

  case class TokenClaims(id: AccountUUID, emailAddress: String)

  case class Repository(account: Account, name: String, description: Option[String])

  case class Account(id: AccountUUID, username: String, emailAddress: String, password: String)

}


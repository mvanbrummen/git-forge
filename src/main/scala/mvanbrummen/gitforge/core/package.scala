package mvanbrummen.gitforge

import java.util.UUID

package object core {

  type AccountUUID = UUID
  type RepositoryUUID = UUID
  type UserAuthToken = String

  final case class TokenClaims(id: AccountUUID, emailAddress: String)
  final case class TokenResponse(token: UserAuthToken)

  final case class Repository(id: RepositoryUUID, accountId: AccountUUID, name: String, description: Option[String])

  final case class Account(id: AccountUUID, username: String, emailAddress: String, password: String)

}


package mvanbrummen.gitforge

import java.util.UUID

import mvanbrummen.gitforge.utils.git.{ Branch, Commit, GitDirectoryItem, GitRepositorySummary }

package object core {

  type AccountUUID = UUID
  type RepositoryUUID = UUID
  type UserAuthToken = String

  case class RepositoryNotFoundException(msg: String) extends RuntimeException(msg)

  final case class TokenClaims(id: AccountUUID, username: String, emailAddress: String)

  final case class TokenResponse(token: UserAuthToken)

  final case class Repository(id: RepositoryUUID, accountId: AccountUUID, name: String, description: Option[String])

  final case class Account(id: AccountUUID, username: String, emailAddress: String, password: String)

  final case class RepositorySummary(
    description: Option[String],
    isClean: Boolean,
    branches: Seq[Branch],
    totalCommits: Int,
    lastCommit: Option[Commit],
    items: Seq[GitDirectoryItem],
    readme: Option[String]
  )

  object RepositorySummary {
    def apply(description: Option[String], gitSummary: GitRepositorySummary): RepositorySummary = {
      import gitSummary._

      RepositorySummary(
        description,
        isClean,
        branches,
        totalCommits,
        lastCommit,
        items,
        readme
      )
    }
  }

}


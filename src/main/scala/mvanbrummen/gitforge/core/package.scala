package mvanbrummen.gitforge

package object core {

  case class Repository(account: Account, name: String, description: Option[String])

  case class Account(username: String, emailAddress: String)

}


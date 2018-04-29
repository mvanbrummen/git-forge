package mvanbrummen.gitforge.core.auth

import java.util.UUID

import mvanbrummen.gitforge.DatabaseIntegration
import mvanbrummen.gitforge.core.Account
import org.scalatest.{ Matchers, WordSpec }

import scala.concurrent.Await
import scala.concurrent.duration._

class AccountRepositoryIntegrationTest extends WordSpec with Matchers with DatabaseIntegration {

  val repository = new AccountRepository(db)

  "Finding account by name" should {
    "return correct account" in {
      val res = Await.result(repository.findAccount("test_user"), 5.seconds)

      res shouldBe 'isDefined

      val account = res.get

      account.username should equal("test_user")
      account.password should equal("\uFEFF$2a$10$H2NvbSRiEq/u7Ow4MaWZh.StBl4xCJ1UJwXjQQwlkDdt0EjGv.iCG")
      account.emailAddress should equal("test_user@test.com")
      account.id should equal(UUID.fromString("07dea038-dbad-459b-9643-ca9706195f28"))
    }
  }

  "Saving a new account" should {
    "result in a new account persisted" in {
      val id = UUID.randomUUID()
      val username = s"test_user_$id"
      val emailAddress = s"test_user_$id@test.com"
      val password = "Password@1"

      val newAccount = Account(id, username, emailAddress, password)
      val res = Await.result(repository.saveAccount(newAccount), 5.seconds)

      res.username should equal(username)
      res.emailAddress should equal(emailAddress)
      res.password should equal(password)
      res.id should equal(id)
    }
  }
}

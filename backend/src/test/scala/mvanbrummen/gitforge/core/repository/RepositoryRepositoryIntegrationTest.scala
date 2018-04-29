package mvanbrummen.gitforge.core.repository

import java.util.UUID

import mvanbrummen.gitforge.DatabaseIntegration
import org.scalatest.{ Matchers, WordSpec }

import scala.concurrent.Await
import scala.concurrent.duration._

class RepositoryRepositoryIntegrationTest extends WordSpec with Matchers with DatabaseIntegration {

  val repository = new RepositoryRepository(db)

  "Finding all repositories" should {
    "return a result" in {
      val res = Await.result(repository.findAll("test_user"), 5.seconds)

      res should not be empty
    }
    "return no result for an unknown user" in {
      val res = Await.result(repository.findAll("no_such_user"), 5.seconds)

      res shouldBe 'isEmpty
    }
  }
  "Finding a repostiory" should {
    "return a result" in {
      val res = Await.result(repository.find("test_user", "test_repository"), 5.seconds)

      res shouldBe 'isDefined

      val repo = res.get

      repo.name should equal("test_repository")
      repo.description should equal(Some("A splendid git repository"))
      repo.accountId should equal(UUID.fromString("07dea038-dbad-459b-9643-ca9706195f28"))
      repo.id should equal(UUID.fromString("8d984d8e-da75-419f-9e91-68b7f3d482cf"))
    }
    "return no result for unknown user" in {
      val res = Await.result(repository.find("no_such_user", "test_repository"), 5.seconds)

      res should equal(None)
    }
    "return no result for unknown repository" in {
      val res = Await.result(repository.find("test_user", "no_such_repository"), 5.seconds)

      res should equal(None)
    }
    "return no result for unknown repository and unknown user" in {
      val res = Await.result(repository.find("no_such_user", "no_such_repository"), 5.seconds)

      res should equal(None)
    }
  }
}

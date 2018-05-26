package mvanbrummen.gitforge.core.repository

import java.io.File
import java.time.Instant
import java.util.UUID

import mvanbrummen.gitforge.core.{ AccountUUID, Repository, RepositorySummary }
import mvanbrummen.gitforge.utils.FileUtil
import mvanbrummen.gitforge.utils.git._
import org.eclipse.jgit.errors.RepositoryNotFoundException
import org.slf4j.LoggerFactory
import org.zeroturnaround.zip.ZipUtil

import scala.concurrent.{ ExecutionContext, Future }

class RepositoryService(repositoryRepository: RepositoryRepository, gitUtil: GitUtil)(implicit ec: ExecutionContext) {
  private val logger = LoggerFactory.getLogger(getClass.getName)

  def findRepositoriesByAccount(name: String): Future[Seq[Repository]] = {
    repositoryRepository.findAll(name)
  }

  def getRepositorySummary(account: String, name: String): Future[RepositorySummary] = {
    val git = JGitUtil.openRepository(account, name)
    val gitSummary = gitUtil.getRepositorySummary(git.getRepository)

    repositoryRepository.find(account, name).map {
      case Some(repo) => RepositorySummary(repo.description, gitSummary)
      case None => throw new RepositoryNotFoundException(s"Could not find repo: /$account/$name")
    }
  }

  def saveRepository(account: AccountUUID, username: String, name: String, description: Option[String]): Future[Repository] = {
    gitUtil.initRepository(username, name)
    repositoryRepository.save(Repository(UUID.randomUUID(), account, name, description))
  }

  def getRepositoryItemsByPath(account: String, name: String, path: String): Future[Seq[GitDirectoryItem]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.listDirectory(git.getRepository, path)
  }

  def getBlobContentsByPath(account: String, name: String, path: String): Future[Option[String]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.getFileContents(git.getRepository, path)
  }

  def getAllCommitsByRef(account: String, name: String, ref: String): Future[Seq[Commit]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.getAllCommitsByRef(git.getRepository, ref)
  }

  def diffCommits(account: String, name: String, oldSha: String, newSha: String): Future[Seq[CommitDiff]] = Future {
    val git = gitUtil.openRepository(account, name)

    gitUtil.diffCommits(git.getRepository, oldSha, newSha)
  }

  def getRefs(account: String, name: String): Future[Refs] = Future {
    val git = gitUtil.openRepository(account, name)

    val branches = gitUtil.listBranches(git.getRepository)
    val tags = gitUtil.listTags(git.getRepository)

    Refs(branches, tags)
  }

  def checkout(account: String, name: String, branch: String): Future[String] = Future {
    val git = gitUtil.openRepository(account, name)

    git.checkout().setName(branch).call().getName
  }

  def getZip(account: String, name: String, fileName: String): Future[String] = Future {
    logger.debug("Generating zip file: {}", fileName)

    val unixTimestamp = Instant.now.getEpochSecond

    val source = FileUtil.repositoryDir(account, name)
    val zipDestination = new File(s"${FileUtil.tmpDir.getAbsolutePath}/${fileName}_$unixTimestamp.zip")

    ZipUtil.pack(source, zipDestination)

    zipDestination.getAbsolutePath
  }
}

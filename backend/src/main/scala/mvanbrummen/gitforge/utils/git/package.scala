package mvanbrummen.gitforge.utils

package object git {

  case class GitRepositorySummary(
    isClean: Boolean,
    branches: Seq[Branch],
    totalCommits: Int,
    lastCommit: Option[Commit],
    items: Seq[GitDirectoryItem],
    readme: Option[String]
  )

  case class GitDirectoryItem(isDir: Boolean, path: String)

  case class Branch(fullName: String, name: String, refId: String)

  case class Commit(
    commitHash: String,
    committerName: String,
    message: String,
    commitTime: Int,
    parents: Seq[String]
  )

}

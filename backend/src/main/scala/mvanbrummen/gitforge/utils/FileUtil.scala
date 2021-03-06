package mvanbrummen.gitforge.utils

import java.io.File

import scala.util.Properties._

object FileUtil {

  def homeDir: File = createDir(envOrElse("GITFORGE_HOME", ".gitforge"))

  def tmpDir: File = createDir(envOrElse("GITFORGE_TMP", s"${homeDir.getAbsolutePath}/tmp"))

  def repositoryDir(account: String, name: String): File = createDir(s"${homeDir.getAbsolutePath}/$account/$name")

  def gitDir(account: String, name: String): File = createDir(s"${homeDir.getAbsolutePath}/$account/$name/.git")

  private def createDir(path: String): File = {
    val dir = new File(path)
    dir.mkdirs()

    dir
  }
}

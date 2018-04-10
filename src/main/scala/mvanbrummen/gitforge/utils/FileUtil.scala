package mvanbrummen.gitforge.utils

import java.io.File

import scala.util.Properties._

object FileUtil {

  def homeDir: File = createDir(envOrElse("GITFORGE_HOME", ".gitforge"))

  def repositoryDir(account: String, name: String): File = createDir(s"${homeDir.getAbsolutePath}/$account/$name")

  private def createDir(path: String): File = {
    val dir = new File(path)
    dir.mkdirs()

    dir
  }
}

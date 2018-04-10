package mvanbrummen.gitforge.utils

import org.eclipse.jgit.api.Git
import mvanbrummen.gitforge.utils.FileUtil.repositoryDir
import org.eclipse.jgit.lib.Constants

object JGitUtil {

  def initRepository(account: String, name: String) = {
    val git = Git.init().setDirectory(repositoryDir(account, name)).call()
    assert(git.getRepository.getRef(Constants.HEAD) != null)
    assert(git.status().call().isClean)
  }

}

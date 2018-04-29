package mvanbrummen.gitforge.ssh

import java.io.File
import java.security.PublicKey

import org.apache.sshd.git.pack.GitPackCommandFactory
import org.apache.sshd.server.keyprovider.SimpleGeneratorHostKeyProvider
import org.apache.sshd.server.session.ServerSession
import org.slf4j.LoggerFactory

class SshServer(port: Int = 22, rootDir: String) {
  private val logger = LoggerFactory.getLogger(classOf[SshServer])

  private val sshd = org.apache.sshd.server.SshServer.setUpDefaultServer()

  private def configure() = {
    logger.info("Configuring SSH server...")
    sshd.setPort(port)
    sshd.setPublickeyAuthenticator((username: String, key: PublicKey, session: ServerSession) => true) // TODO implement
    sshd.setKeyPairProvider(new SimpleGeneratorHostKeyProvider(
      new File(getClass.getResource("/id_rsa").getPath)
    ) // TODO set actual key
    )

    sshd.setCommandFactory(new GitPackCommandFactory(rootDir))
  }

  def start() = {
    logger.info("Starting SSH server...")
    configure()

    sshd.start()
    logger.info("Started SSH server!")
  }
}

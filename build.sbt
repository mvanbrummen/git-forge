lazy val akkaHttpVersion = "10.0.11"
lazy val akkaVersion = "2.5.11"

lazy val projectSettings = Seq(
  name := "git-forge",
  version := "0.1-SNAPSHOT",
  organization := "mvanbrummen.gitforge",
  scalaVersion := "2.12.4"
)

lazy val root = (project in file("."))
  .aggregate(backend)

lazy val backend = project
  .enablePlugins(JavaAppPackaging)
  .settings(projectSettings: _*)
  .settings(
    libraryDependencies ++= Seq(
      // akka
      "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-xml" % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-stream" % akkaVersion,

      // git
      "org.eclipse.jgit" % "org.eclipse.jgit" % "4.11.0.201803080745-r",

      // cors
      "ch.megard" %% "akka-http-cors" % "0.3.0",

      // bcrypt
      "com.github.t3hnar" %% "scala-bcrypt" % "3.1",

      // JWT
      "com.pauldijou" %% "jwt-core" % "0.16.0",

      // JSON serialization
      "de.heikoseeberger" %% "akka-http-circe" % "1.20.0",
      "io.circe" %% "circe-core" % "0.9.1",
      "io.circe" %% "circe-generic" % "0.9.1",
      "io.circe" %% "circe-parser" % "0.9.1",

      // config
      "com.github.pureconfig" %% "pureconfig" % "0.9.1",

      // logging
      "ch.qos.logback" % "logback-classic" % "1.2.3",

      // database
      "org.postgresql" % "postgresql" % "42.1.4",

      "com.typesafe.slick" %% "slick" % "3.2.0",
      "com.zaxxer" % "HikariCP" % "2.7.0",

      // database migrations
      "org.flywaydb" % "flyway-core" % "5.0.7",

      // ssh
      "org.apache.sshd" % "sshd-core" % "1.7.0",
      "org.apache.sshd" % "sshd-git" % "1.7.0",

      // test
      "com.typesafe.akka" %% "akka-http-testkit" % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-testkit" % akkaVersion % Test,
      "com.typesafe.akka" %% "akka-stream-testkit" % akkaVersion % Test,
      "org.scalatest" %% "scalatest" % "3.0.1" % Test
    )
  )
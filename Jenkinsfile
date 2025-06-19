pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube' // Tên cấu hình trong Jenkins
        SCANNER = 'sonar-scanner' // Tên bạn đặt cho tool scanner
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE}") {
                    tool name: "${SCANNER}", type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    bat "${tool "${SCANNER}"}/bin/sonar-scanner -Dsonar.projectKey=webquanlysinhvien -Dsonar.sources=sinhvien -Dsonar.java.binaries=."
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("webquanlysinhvien:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Done') {
            steps {
                echo '✅ Pipeline complete!'
            }
        }
    }
}

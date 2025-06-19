pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube' 
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
                
                    bat 'sonar-scanner -Dsonar.projectKey=webquanlysinhvien -Dsonar.sources=src -Dsonar.java.binaries=build'
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
                echo 'Pipeline complete!'
            }
        }
    }
}

pipeline {
    agent any
    tools {
        // Tên bạn đặt trong Global Tool Configuration
        sonarQubeScanner 'sonar-scanner' 
    }
    environment {
        // Tên cấu hình SonarQube server đã đặt
        SONARQUBE_ENV = 'MySonarQubeServer' 
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    bat "sonar-scanner -Dsonar.projectKey=webquanlysinhvien -Dsonar.sources=src"
                }
            }
        }
    }
}

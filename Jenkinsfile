pipeline {
    agent any

    environment {
        JAR_NAME = "task-manager-0.0.1-SNAPSHOT.jar"
        APP_DIR  = "/home/ec2-user"
        LOG_FILE = "/home/ec2-user/app.log"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/rohitkumar136/task-manager.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Deploy') {
            steps {
                sh """
                echo "Stopping old application..."
                pkill -f ${JAR_NAME} || true

                echo "Deploying new JAR..."
                cp target/${JAR_NAME} ${APP_DIR}

                echo "Starting application..."
                nohup java -jar ${APP_DIR}/${JAR_NAME} > ${LOG_FILE} 2>&1 &
                """
            }
        }
    }

    post {
        success {
            echo "✅ Application deployed successfully via Jenkins"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}

pipeline {
    agent any

    environment {
        APP_NAME = "task-manager"
        JAR_NAME = "task-manager-0.0.1-SNAPSHOT.jar"
        APP_DIR  = "/home/ec2-user"
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
                echo "Stopping old application if running..."
                pkill -f ${APP_NAME} || true

                echo "Copying new jar..."
                cp target/${JAR_NAME} ${APP_DIR}

                echo "Starting application..."
                nohup java -jar ${APP_DIR}/${JAR_NAME} > ${APP_DIR}/app.log 2>&1 &
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

pipeline {
	agent any
	environment {
	    SERVER_CREDS="duncan@158.89.232.237"
	}
	stages {
		stage('Checkout') {
			steps {
				echo 'Checkout...'
				checkout scm
			}
		}
		stage('Install') {
		    steps {
                sh '''
                    npm install
                '''
		    }
		}
		stage('Start') {
			steps {
				echo 'Start...'
		        sh '''
		            rsync -avz -e 'ssh' ./**/ ${SERVER_CREDS}:/duncannevin
		            ssh ${SERVER_CREDS} ls
		        '''
			}
		}
	}
	post {
	    always {
	        deleteDir()
	    }
	}
}

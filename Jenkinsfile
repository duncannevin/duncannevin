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

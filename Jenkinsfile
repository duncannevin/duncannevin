pipeline {
	agent any
	environment {
	    SERVER_CREDS="duncan@159.89.232.237"
	    PROJECT_LOC="./duncannevin"
	}
	stages {
		stage('Checkout') {
			steps {
				echo 'Checkout...'
				checkout scm
			}
		}
		stage('Start') {
			steps {
				echo 'Start...'
		        sh '''
		            ssh ${SERVER_CREDS} rm -rf ${PROJECT_LOC};
		            ssh ${SERVER_CREDS} mkdir duncannevin;
		            scp -r ./** ${SERVER_CREDS}:duncannevin;
		            ssh ${SERVER_CREDS} cd duncannevin && npm install;
		            ssh ${SERVER_CREDS} pm2 stop npm && pm2 start npm;
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

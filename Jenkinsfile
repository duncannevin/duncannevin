pipeline {
	agent any
	environment {
	    SERVER_CREDS="duncan@158.89.232.237"
	    PROJECT_LOC="./duncannevin"
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
		            ssh ${SERVER_CREDS} rm -rf ${PROJECT_LOC};
		            ssh ${SERVER_CREDS} mkdir duncannevin;
		            scp -r . ${SERVER_CREDS}:/duncannevin;
		            ssh ${SERVER_CREDS} pm2 restart npm
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

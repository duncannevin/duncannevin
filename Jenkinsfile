pipeline {
	agent any
	environment {
	    SERVER_CREDS="duncan@159.89.232.237"
	    PROJECT_LOC="duncannevin"
	}
	stages {
		stage('Checkout') {
			steps {
				echo 'Checkout...'
				sh '''
                    checkout scm
				'''
			}
		}
		stage('Configure env') {
		    steps {
                echo 'Configure env...'
                sh '''
                    nvm use 8
                    echo 'node -v'
                '''
		    }
		}
		stage('Install') {
		    steps {
		        echo 'Install...'
		        sh '''
                    npm install
		        '''
		    }
		}
		stage('Start') {
			steps {
				echo 'Start...'
		        sh '''
		            ssh ${SERVER_CREDS} pm2 stop all
		            ssh ${SERVER_CREDS} rm -rf ${PROJECT_LOC}
		            ssh ${SERVER_CREDS} mkdir ${PROJECT_LOC}
		            scp -r ./** ${SERVER_CREDS}:${PROJECT_LOC}
		            ssh ${SERVER_CREDS} cd ${PROJECT_LOC};
		            ssh ${SERVER_CREDS} pm2 start npm;
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

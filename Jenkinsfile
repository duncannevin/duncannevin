def duncanNevinBadge = addEmbeddableBadgeConfiguration(id: "duncannevin-build", subject: "Build")

pipeline {
	agent any
	tools { nodejs "node8" }
	environment {
	    PROJECT_LOC="duncannevin"
	}
	stages {
		stage('Checkout') {
			steps {
				echo 'Checkout...'
                checkout scm
			}
		}
		stage('Configure env') {
		    steps {
                echo 'Configure env...'
                sh '''
                    node -v
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
		            ssh ${DUNCAN_NEVIN} pm2 stop all
		            ssh ${DUNCAN_NEVIN} rm -rf ${PROJECT_LOC}
		            ssh ${DUNCAN_NEVIN} mkdir ${PROJECT_LOC}
		            scp -r ./** ${DUNCAN_NEVIN}:${PROJECT_LOC}
		            ssh ${DUNCAN_NEVIN} cd ${PROJECT_LOC};
		            ssh ${DUNCAN_NEVIN} pm2 start npm;
		        '''
			}
		}
	}
	post {
	    always {
	        deleteDir()
	    }
	    success {
	        script {
                duncanNevinBadge.setStatus('passing')
	        }
        }
        failure {
            script {
                duncanNevinBadge.setStatus('failing')
                duncanNevinBadge.setColor('red')
            }
        }
	}
}

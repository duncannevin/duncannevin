pipeline {
	agent any
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
		            rsync -avz -e 'ssh' ./**/ duncan@159.89.232.237:/duncannevin
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

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
				echo 'Build...'
		        sh '''
		            ls
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

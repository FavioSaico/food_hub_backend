def lastCommit
pipeline {
    agent any
    environment {
        NAME_IMAGE = "api-registro-login"
    }
    stages {
        stage('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    dir(NAME_IMAGE){
                        sh 'echo "test"'
                    }
                }
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dir(NAME_IMAGE){
                    dependencyCheck additionalArguments: ''' 
                            -o './'
                            -s './'
                            -f 'ALL' 
                            --prettyPrint''', odcInstallation: 'DependencyCheck'
                
                    dependencyCheckPublisher pattern: 'dependency-check-report.xml'
                }
            }
        }
        stage('Build Image') {
            steps {
                script{
                    lastCommit = sh(script: '''cd ./''' + NAME_IMAGE + ''' && git rev-parse HEAD''', returnStdout: true).trim()
                    sh '''docker build -t ${NAME_IMAGE}:''' + lastCommit + ''' ''' + NAME_IMAGE
                }
            }
        }
        stage('Delivery to Artifact Registry') {
            steps {
                sh 'gcloud auth activate-service-account jenkins-docker-2@probable-axon-424104-t6.iam.gserviceaccount.com --key-file=/var/jenkins_home/probable-axon-424104-t6-c6e113e170af.json'
                sh '''gcloud auth configure-docker southamerica-west1-docker.pkg.dev'''
                sh '''docker tag ${NAME_IMAGE}:''' + lastCommit + ''' southamerica-west1-docker.pkg.dev/probable-axon-424104-t6/repo-image-docker/${NAME_IMAGE}:'''+ lastCommit
                sh '''docker push southamerica-west1-docker.pkg.dev/probable-axon-424104-t6/repo-image-docker/${NAME_IMAGE}:'''+ lastCommit
            }
        }
    }
}
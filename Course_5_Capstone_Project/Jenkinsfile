pipeline {
     agent any
     stages {
         stage('Build and send initial slack message') {
              steps {
                  sh 'echo Building...'
                  slackSend message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
              }
         }
         stage('Lint Dockerfile') {
            steps {
                script {
                    docker.image('hadolint/hadolint:latest-debian').inside() {
                            sh 'hadolint ./Dockerfile | tee -a hadolint_lint.txt'
                            sh '''
                                lintErrors=$(stat --printf="%s"  hadolint_lint.txt)
                                if [ "$lintErrors" -gt "0" ]; then
                                    echo "Errors have been found, please see below"
                                    cat hadolint_lint.txt
                                    exit 1
                                else
                                    echo "There are no erros found on Dockerfile!!"
                                fi
                            '''
                    }
                }
            }
        }
         stage('Security Scan') {
              steps { 
                 aquaMicroscanner imageName: 'node:12.13.1-stretch-slim', notCompliesCmd: 'exit 1', onDisallowed: 'fail', outputFormat: 'html'
              }
         }     
         stage('Build Docker Image') {
              steps {
                  sh 'docker build -t capstone-app-sagarnil .'
              }
         }
         stage('Push Docker Image') {
              steps {
                  withDockerRegistry([url: "", credentialsId: "dockerhub"]) {
                      sh "docker tag capstone-app-sagarnil sagarnildass/capstone-app-sagarnil"
                      sh 'docker push sagarnildass/capstone-app-sagarnil'
                  }
              }
         }
         stage('Deploying') {
              steps{
                  echo 'Deploying to AWS...'
                  withAWS(credentials: 'aws-static', region: 'ap-south-1') {
                      sh "aws eks --region ap-south-1 update-kubeconfig --name capstoneclustersagarnil"
                      sh "kubectl config use-context arn:aws:eks:ap-south-1:960920920983:cluster/capstoneclustersagarnil"
                      sh "kubectl apply -f capstone-k8s.yaml"
                      sh "kubectl get nodes"
                      sh "kubectl get deployments"
                      sh "kubectl get pod -o wide"
                      sh "kubectl get service/capstone-app-sagarnil"
                  }
              }
        }
        stage('Checking if app is up') {
              steps{
                  echo 'Checking if app is up...'
                  withAWS(credentials: 'aws-static', region: 'ap-south-1') {
                     sh "curl ad0e6a88870a9477989eb79393197b59-2120449898.ap-south-1.elb.amazonaws.com:9080"
                     slackSend(message: "The app is up at: ad0e6a88870a9477989eb79393197b59-2120449898.ap-south-1.elb.amazonaws.com:9080", sendAsText: true)
                  }
               }
        }
        stage('Checking rollout') {
              steps{
                  echo 'Checking rollout...'
                  withAWS(credentials: 'aws-static', region: 'ap-south-1') {
                     sh "kubectl rollout status deployments/capstone-app-sagarnil"
                  }
              }
        }
        stage("Cleaning up") {
              steps{
                    echo 'Cleaning up...'
                    sh "docker system prune"
              }
        }
     }
}

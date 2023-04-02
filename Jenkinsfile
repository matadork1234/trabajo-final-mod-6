pipeline {
  agent any

  stages {
    stage('Desarrollo') {
      steps {
        sh 'npm install'
        sh 'npm run dev'
      }
    }
    
    stage('Calidad') {
      steps {
        sh 'npm run lint'
        sh 'npm run test'
      }
    }
    
    stage('Producción') {
      steps {
        sh 'npm run build'
        sh 'npm run deploy'
      }
    }
  }
}
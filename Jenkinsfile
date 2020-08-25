pipeline { 
    agent any 

    tools {
        nodejs 'node-12.18.3'
    }

    options {
        timeout(time: 2, unit: 'MINUTES')
    }

    stages { 
        stage('Moverme al proyecto') {  
            steps { 
                sh 'cd /home/ubuntu/utn_ferrelepe'
            } 
        }
        stage('Instalar Dependencias') {  
            steps { 
                sh 'npm i'
            } 
        }
        stage('Tirar el server') {  
            steps { 
                sh 'pm2 delete api'  
            } 
        } 
        stage('Desplegar el server') {  
            steps { 
                sh 'pm2 start ./index.js --interpreter ./node_modules/babel-cli/bin/babel-node.js --name "api"'  
            } 
        } 
    } 
}
# Getting Started with SpritleRailwayTicketBooking
I configured the system to send email using PHPMailer, SendEmail with an attachment receipt, upload to the nodejs folder, JWT tokens for the API, and tested the application's edge cases. I also dockerized this application.

#### website Link    :          https://spritleticketbookingfrontend.onrender.com <br>
#### API Link        :          https://spritleticketbookingbackend.onrender.com/<br>
#### Email Link      :          https://spritleemailapi.onrender.com/index.php
#### Video Link      :          https://drive.google.com/file/d/1SevTfvYgjksZbsw3Dui9Dac7xKfvEj-x/view?usp=sharing<br>
#### Docker FrontEnd :          docker pull rameshkannan0078/spritleticketbookingfrontend:tagname<br>
#### Docker BackEnd  :          docker pull rameshkannan0078/spritleticketbookingfrontend:backend<br>
#### Docker EmailSend:          docker pull rameshkannan0078/spritleticketbookingfrontend:sendemail


# Getting Started with Docker

1.)Pull the FrontEnd from Dockerhub

###  docker pull rameshkannan0078/spritleticketbookingfrontend:tagname<br>

2.)Pull the backend from Dockerhub

###  docker pull rameshkannan0078/spritleticketbookingfrontend:backend

3.)Pull the EmailSend From Dockerhub

###  docker pull rameshkannan0078/spritleticketbookingfrontend:sendemail

4.)Run the Frontend Using

### docker run -d -p 3000:3000 --name rameshkannan0078/spritleticketbookingfrontend:tagname


5.)Run the Backend Using

### docker run -d -p 3001:3001 --name rameshkannan0078/spritleticketbookingfrontend:backend

6.)Run the SendEmail Using

### docker run -d -p 3002:3002 --name rameshkannan0078/spritleticketbookingfrontend:sendemail

# Getting Started with Nodejs

1.)Make the path of frontend in cmd.
### npm install
It will install all the packages of frontend
### npm start

http://localhost:3000

2.)Make the path of Backend in cmd.
### npm install
### node index.js

It will install all the packages of backend

3.)Make the path of SendEmail in cmd.
### Install the PHP
### php -S localhost:3002 -t SendEmail/





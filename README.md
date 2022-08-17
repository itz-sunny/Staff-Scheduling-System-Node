# Staff Scheduling System

## Pre-Requisites
1. Make sure that you have **mysql** installed on your local machine, and it's up and running.
1. Make sure that you have **docker** installed on your local machine, and it's up and running.
3. Make sure to copy **.env.example** file and create a new **.env** file with its same content using values that reflects your environment.
4. For running locally comment ***MYSQLDB_HOST*** in ***.env** and leave uncommented only when running docker

## For Running using docker
we can just run command docker-compose up in root directory of the project
***When running for the first time*** .For now I have not integrated migration and seeders in docker so we have to manually bash into the app container cd ./src/.db and run db:migrate. This will create all the required tables and indexes. After that we have to create a seed user as admin. As app allows registration of user as ***STAFF*** only

## Run The App using Node
We can run the whole app on our local machine by triggering the following commands:

```bash
npm install
npm start
```

The initial runtime, will try to establish a local mysql connection, and we have to create the tables. we can use sequelize migrations for that. Also we have to create a seed user as admin.
once we get in the log **DB connection has been established successfully**, we are all good to go.

## Application API
We can access the app by opening http://localhost:8080/app/v1 in your browser, and then interact with the api
using postman or a similar app.

## API Documentation:
API documentation is provided as:
1. An Open API yml document. we can access swagger ui on http://localhost:8080/app/v1/docs.

A Bearer Token is required in order to make a successful api call, we'll be able to fetch it by using the login endpoint after a triggering successful registration.
Make sure to pass it under the request headers for all the api calls, except login/register: [authorization: Bearer XXXXXXXXXXXXXXX].
We have two roles - [**ADMIN**, **STAFF**]
Some APIs like delete/update are only permitted to **ADMIN**

***ER Diagram***
![alt text](https://github.com/itz-sunny/Staff-Scheduling-System-Node/blob/main/er-diagram.png?raw=true)


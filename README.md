# authentication-system
User authentication system, using express.js, bcrypt ,JWT, mySql.

## Functionality and Description

This is a simple authentication system project where you can register a new user, the data is saved on a SQL database, using bcrypt to validate if the password is correct and also using JWT to generate a token wich is save to local storage.
This is a simple authentication system project where you can register a new user, the data is saved on a SQL database, using bcrypt to validate if the password is correct and also using JWT to generate a token wich is save to local storage.

## Utilization

It's necessary to create a .env file with the following variables:

NODE_ENV=development
TOKEN_SECRETE=secret

DB_HOST=host
DB_USER=useer
DB_PASS=password
DB_DB=database

HOSTNAME=ip
PORT=port
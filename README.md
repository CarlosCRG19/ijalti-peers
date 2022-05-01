<h1 align="center">Fake Project</h1>
This project is just a sample of the interaction between the different technologies that we mentioned in the standup on April 28. __It is not__ strictly something that should be included in the final project. Once again, it is only for reference and its sole purpose is demonstration.

This projects takes a basic use case `Post a Job Offer` and delivers a full CRUD system that connects a basic client and server.

## Features
* Create a company using a business name (razón social) and a password
* Create, Update and Delete a Job Offer
* Display all Job Offers

## Tech Stack
* Frontend: React, JavaScript
* Backend: Express, TypeScript, Node
* Database: PostgreSQL

## Setup
- Install [postgreSQL](https://www.postgresql.org/) if you don't have it already and create a database named `fake_project`.
- From terminal run the following commands:
  - `git clone git@github.com:CarlosCRG19/engibeers.git` - clone the repo in case you don't have it
  - `cd engibeers` 
  - `git checkout fake-project` - change to this project's branch
  - `cd client/ && npm install` - enter the client (front-end) folder and install packages
  - `cd ../server/ && npm install` - enter the server (back-end) folder and install packages
  - `cd ../ && npm install` - return to the main folder and install packages
  - `npm start` - start project
- App should now be running on `http://localhost:3006/`

## Frontend technologies

## Backend technologies

## Important Notes
1. The app does not give feedback after the creation of an offer or company, so don't click the `Create` button more than once :P

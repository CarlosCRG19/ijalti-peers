<h1 align="center">Fake Project</h1>
This project is just a sample of the interaction between the different technologies that we mentioned in the standup on April 28. __It is not__ strictly something that should be included in the final project. Once again, it is only for reference and its sole purpose is demonstration.

This projects takes a basic use case `Post a Job Offer` and delivers a full CRUD system that connects a basic client and server.

## Features
* Create a company using a business name (razón social) and a password
* Create, Update and Delete a Job Offer
* Display all Job Offers

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

## Used Technologies
### Tech stack overview
* Frontend: React, JavaScript
* Backend: Express, TypeScript, Node
* Database: PostgreSQL

### Frontend
* The frontend project was initialized with the [Create React App](https://create-react-app.dev/) boilerplate, which provides an easy and ready to go environment for development.
* The styles were managed with [React Bootstrap](https://getbootstrap.com/) which is a beginner-friendly framework that provides components with embeded styles. Its API is very clean IMO and I didn't even have to write any CSS... yet, this can be a disadvantage, since custom styles might be more difficult to implement.
```javascript
const Header = () => (
  <Navbar className="p-2" bg="primary" expand="lg" variant="dark">
    <Navbar.Brand href="#">IJALTI Peers</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Offers</Nav.Link>
        <Nav.Link href="/create">Create Offer</Nav.Link>
        <Nav.Link href="/companies/create">Create Company</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
```
* For form control I used [React Hook Form](https://react-hook-form.com/) which TBH may be overkill for this project. I liked how it made it easy to collect data from different inputs as you only need to use the `register` method, but this might as well be done with classic state control via `useState` and `useReducer`.
* Finally, I used [Axios](https://github.com/axios/axios) to connect to the backend API. The reason for this is because you can specify a base URL so you don't have to type `http://localhost:3006/` on each call. Additionally, an axios instance provides specific methods for `put`, `post`, `get`, `update` and `patch`.

### Backend
* [TypeORM](https://typeorm.io/) is the shit. Its interface is beautiful and it can create a connection to many different databases, in this way, we decouple our project with the database and this means that we change the database provider at any time without making many big changes!

```javascript
import { createConnection, Connection } from 'typeorm';

import * as models from './models';

const createDatabaseConnection = async (): Promise<Connection | undefined> => {
    try {
        const databaseConnection = await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '',
            database: 'fake_project',
            entities: Object.values(models),
            synchronize: true
        });

        return databaseConnection;
    } catch(error) {
        console.log(error);
    }
};

export default createDatabaseConnection;
```

## Database design
For this use case I made an extremely reduced database design that omits a lot of information that may be relevant in the real project. In general, its based on two entities, Company and Offer, where there is a one-to-many relationship between them (as we saw in class, this relationship is implemented through a reference in the entity that can be many).

Here are the original diagrams.

![database_design drawio](https://user-images.githubusercontent.com/61464973/166169363-95309ffb-faa7-4bb7-b795-4de2f227705b.png)



And here is the real implementation of such entities.
__Company__
| Property | Type | Description |
| --- | --- | --- |
| id | number | Unique identifier for the Company (default field) |
| businessName | string | Unique and official name of the company ("razón social") | 
| password | string | _self explanatory_ | 

__Offer__
| Property | Type | Description |
| --- | --- | --- |
| id | number | Unique identifier for the Offer (default field) |
| companyId | number | Reference to the company that created this offer | 
| position | string | The role for which the company is searching aspirants | 
| location | string | A county from the Guadalajara Metropolitan Zone | 
| createdAt | timestamp | The date in which an offer is created (auto-generated) |
| updatedAt | timestamp | The date in which an offer was last updated (auto-generated) | 

## Important Notes
1. The app does not give feedback after the creation of an offer or company, so don't click the `Create` button more than once :P

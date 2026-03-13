# Simple EcommerceApp

This is a **simple educational Ecommerce application** built with **Angular**.  
The project is mainly for learning purposes and includes a few components with basic functionalities like CRUD operations on products using **json-server**.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Features

- Display a list of products  
- Add, edit, and delete products (**CRUD**)  
- Use of **json-server** as a mock backend  
- Basic Angular components (Footer, Header, Product List, etc.)  
- Simple routing for navigating between pages  

## Prerequisites

Make sure you have **Node.js** and **Angular CLI** installed:


node -v
npm -v
ng version


Also, install **json-server** globally if you don’t have it:


npm install -g json-server


## Development server

To start a local development server, run:


ng serve


Once the server is running, open your browser and navigate to:


http://localhost:4200/


The application will automatically reload whenever you modify any of the source files.


## Services

The project uses Angular **services** to handle API calls:

- `ProductService` for CRUD operations on products
- `CategoryService` for CRUD operations on categories
- Other services can be added for handling different API resources



## Mock Backend (json-server)

To start the json-server for CRUD operations:


cd server
json-server db.json --watch --port 3000


Your products API will be available at:


http://localhost:3000/products


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:


ng generate component component-name


For a complete list of available schematics (components, directives, or pipes), run:


ng generate --help


## Building

To build the project run:


ng build


This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use:


ng test


## Running end-to-end tests

For end-to-end (e2e) testing, run:


ng e2e


Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)  
- [Angular Documentation](https://angular.dev/docs)  
- [json-server Documentation](https://github.com/typicode/json-server)

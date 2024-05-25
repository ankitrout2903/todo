# Installation
Run the following command to clone the repository
https://www.loom.com/share/8fda9ca8254f4f72a0eaa257ea8810cf?sid=0fec4eeb-431a-46b3-99bd-07c61e46c90a
```
git clone https://github.com/alokyadav1/mern-todo-app.git
```
Go to ```frontend``` and ```backend``` directory to install packages
```
cd frontend
npm install
```
```
cd backend
npm install
```
# Configuration
Create ```.env``` file inside ```backend``` directory and copy the following code

```
MONGO_URI=Your mongodb URI
GMAIL_USERNAME=your gmail address 
GMAIL_PASSWORD=password created inside 'App Password' section under google accounts setting
PORT=8000
JWT_SECRET=a random secret key eg. thisisasecretkey
```
# Run the App
Go to ```backend``` and ```frontend``` directory and start the server
```
cd backend
nodemon server
```
```
cd frontend
npm start
```

## Version Control and Development Lifecycle

The development of this project is managed using version control with three main branches representing different stages of the development lifecycle:

1. **Development Branch**:
    - All new features and enhancements are first implemented and tested in the development branch.
    - This branch is the active area for ongoing development activities.

2. **Testing Branch**:
    - Once features are developed, they are merged into the testing branch.
    - This branch is used for rigorous testing to ensure the stability and reliability of the features.
    - Only thoroughly tested code is promoted from this branch.

3. **Deployment (Main) Branch**:
    - The main branch contains the production-ready code.
    - Only fully tested and approved features from the testing branch are merged here.
    - This branch is deployed to the production environment.

## Features

- **Task Management**:
    - Create, update, and delete tasks.
    - Mark tasks as complete or incomplete.

- **Mailing Feature**:
    - Automated email alerts to notify users when a task is due.

## Technology Stack

- **MERN Stack**:
    - **MongoDB**: Database
    - **Express.js**: Web framework for Node.js
    - **React**: Front-end library
    - **Node.js**: JavaScript runtime environment



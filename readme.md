
---

# MERN Todo App

This project is a full-stack Todo application built with the MERN (MongoDB, Express.js, React, Node.js) stack.

## Installation

Run the following command to clone the repository:

```sh
git clone https://github.com/alokyadav1/mern-todo-app.git
```

Go to `frontend` and `backend` directories to install packages:

```sh
cd frontend
npm install
```

```sh
cd backend
npm install
```

## Configuration

Create a `.env` file inside the `backend` directory and copy the following code:

```
MONGO_URI=Your mongodb URI
GMAIL_USERNAME=your gmail address 
GMAIL_PASSWORD=password created inside 'App Password' section under google accounts setting
PORT=8000
JWT_SECRET=a random secret key eg. thisisasecretkey
```

## Run the App

Go to `backend` and `frontend` directories and start the server:

```sh
cd backend
nodemon server
```

```sh
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

## API Documentation

### User Routes

#### Register a User

- **Endpoint**: `/api/user/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "Password123!"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Login a User

- **Endpoint**: `/api/user/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "Password123!"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "token": "jwt_token"
  }
  ```

#### Get User Info

- **Endpoint**: `/api/user/getuser`
- **Method**: GET
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
  ```

### Task Routes

#### Add a Task

- **Endpoint**: `/api/task/addTask`
- **Method**: POST
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "dueDate": "2024-05-25T00:00:00.000Z"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task added successfully"
  }
  ```

#### Get Tasks

- **Endpoint**: `/api/task/getTask`
- **Method**: GET
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  ```json
  [
    {
      "_id": "task_id",
      "title": "New Task",
      "description": "Task description",
      "completed": false,
      "dueDate": "2024-05-25T00:00:00.000Z",
      "userId": "user_id",
      "createdAt": "2024-05-24T00:00:00.000Z",
      "updatedAt": "2024-05-24T00:00:00.000Z"
    }
  ]
  ```

#### Edit a Task

- **Endpoint**: `/api/task/editTask/:taskId`
- **Method**: PUT
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true,
    "dueDate": "2024-06-25T00:00:00.000Z"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "task_id",
    "title": "Updated Task",
    "description": "Updated description",
    "completed": true,
    "dueDate": "2024-06-25T00:00:00.000Z",
    "userId": "user_id",
    "createdAt": "2024-05-24T00:00:00.000Z",
    "updatedAt": "2024-05-25T00:00:00.000Z"
  }
  ```

#### Remove a Task

- **Endpoint**: `/api/task/removeTask/:taskId`
- **Method**: DELETE
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

### Forgot Password Routes

#### Forgot Password

- **Endpoint**: `/api/forgotPassword/forgotPassword`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "A link to reset your password has been sent to your email."
  }
  ```

#### Reset Password

- **Endpoint**: `/api/forgotPassword/resetPassword`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "token": "reset_token",
    "password": "NewPassword123!"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset successful"
  }
  ```

## Testing

To run end-to-end tests using Jest, Supertest, and mongodb-memory-server, follow these steps:

1. **Install testing dependencies**:
   ```sh
   npm install --save-dev jest supertest mongodb-memory-server
   ```

2. **Update `package.json`**:
   Add Jest configuration and a test script.
   ```json
   {
     "scripts": {
       "test": "jest"
     },
     "jest": {
       "testEnvironment": "node",
       "setupFilesAfterEnv": ["<rootDir>/test/setup.js"]
     }
   }
   ```

3. **Create test setup file (`test/setup.js`)**:
   ```js
   const { MongoMemoryServer } = require('mongodb-memory-server');
   const mongoose = require('mongoose');
   const dotenv = require('dotenv');

   dotenv.config();

   let mongoServer;

   beforeAll(async () => {
     mongoServer = await MongoMemoryServer.create();
     const uri = mongoServer.getUri();

     await mongoose.connect(uri, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
   });

   afterAll(async () => {
     await mongoose.disconnect();
     await mongoServer.stop();
   });

   afterEach(async () => {
     const collections = mongoose.connection.collections;
     for (const key in collections) {
       await collections[key].deleteMany({});
     }
   });
   ```

4. **Create test files in `test` directory**:
   - Create `test/user.test.js`, `test/task.test.js`, and `test/forgotPassword.test.js` as detailed in the previous section.

5. **Run tests**:
   ```sh
   npm test
   ```

This setup ensures comprehensive testing of the user, task, and forgot password functionalities, providing confidence in the stability and reliability of your application.

---

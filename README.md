# server
This is a simple Node.js-based API with JWT-based authentication and MongoDB for storing user data. It allows users to register, log in, and access their profile with  secure token-based authentication.

Features
- User Registration: Allows new users to create an account.
- User Login: Allows existing users to log in.
- Protected Route: The profile route (/profile) is protected by JWT authentication as I utilized this to make a middleware for secure routing.

Tech Stack
- Node.js: JavaScript runtime for server-side scripting.
- Express.js: Web framework for building the API.
- MongoDB: NoSQL database to store user information.
- Mongoose: ODM (Object Data Modeling) library for MongoDB.
- JWT (JSON Web Token): For secure token-based authentication.
- Bcrypt.js: For hashing user passwords.
- CORS: For enabling cross-origin requests.
- dotenv: For loading environment variables from .env file.

Setup instructions (Step-by-step)
- clone my repository

```bash
git clone https://github.com/ipn04/server.git

```
cd server

```
npm install

create a .env file in the root directory and the following

```
SECRET_KEY=your_jwt_secret_key

Example secret_key
```
SECRET_KEY=h4RKmPkJvQUnLyxwe8ZVC2

To start the server, run this command
```
npm run dev



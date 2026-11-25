# STAY MEDIA Backend Practice

A basic Node.js, Express.js, MongoDB, and Mongoose backend for managing intern records.

## How the Technologies Work Together

- **Node.js** runs the JavaScript backend outside a browser.
- **npm** installs and manages project dependencies.
- **Express.js** receives HTTP requests and provides API routes.
- **MongoDB Atlas** stores intern documents in the `staymedia_practice` database.
- **Mongoose** connects Express to MongoDB and validates intern records.
- **Postman** sends and tests API requests.
- **Git and GitHub** store and share the project.

## Installation

```bash
npm install
```

## Environment Configuration

Create `.env`:

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING/staymedia_practice
PORT=3000

Never commit `.env` or include its credentials in GitHub.

## Running the Server

node index.js

Visit `http://localhost:3000`.

## API Endpoints

| Method | Endpoint   | Purpose                     |
| ------ | ---------- | --------------------------- |
| GET    | `/`        | Display the welcome message |
| GET    | `/interns` | Retrieve all interns        |
| POST   | `/interns` | Create a new intern         |

### Example POST Body

{
"name": "Erharuyi Godwin",
"role": "Backend Intern",
"department": "Web Development",
"email": "erharuyi@example.com",
"active": true
}

## Technologies Used

Node.js, npm, Express.js, MongoDB Atlas, Mongoose, Postman, Git, GitHub, and MongoDB Compass.

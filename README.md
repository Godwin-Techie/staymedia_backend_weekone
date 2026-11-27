# STAY MEDIA Backend Practice

My first backend learning project: a small REST API built with Node.js and Express, connected to MongoDB Atlas with Mongoose, tested with Postman, and deployed to Render.

> **Learning project:** This API is for practice and demonstration. It currently has no authentication or authorization and should not be used to store private or production data.

## Live Demo

- **Welcome route:** [https://staymedia-backend-weekone.onrender.com/](https://staymedia-backend-weekone.onrender.com/)
- **List interns:** [https://staymedia-backend-weekone.onrender.com/interns](https://staymedia-backend-weekone.onrender.com/interns)
- **Source code:** [GitHub repository](https://github.com/Godwin-Techie/staymedia_backend_weekone)

The root route returns a welcome message. `/interns` returns JSON records from MongoDB. A free hosting service may take a little time to respond after an idle period.

## What I Built

- A Node.js application using Express.
- Welcome, list, create, search, and delete API endpoints for interns.
- A MongoDB Atlas database named `staymedia_practice` with an `interns` collection.
- A Mongoose model that defines and validates intern documents.
- Environment-variable configuration with `dotenv`.
- A Render deployment that reads Render's assigned `PORT`.
- Screenshots documenting the setup and tests in [`screenshots/`](screenshots/).

## How the Tools Work Together

1. **Node.js** runs the server-side JavaScript.
2. **npm** installs the dependencies listed in `package.json` and records exact dependency versions in `package-lock.json`.
3. **Express** maps HTTP methods and paths to route handlers and parses JSON request bodies.
4. **Mongoose** connects the application to MongoDB and maps intern documents to a schema.
5. **MongoDB Atlas** stores the intern documents in the cloud database.
6. **Postman** sends requests to the local and deployed API so responses can be inspected.
7. **Git and GitHub** track and host the source code.
8. **Render** builds and runs the web service from the GitHub repository.

## Project Structure

```text
backend-practice/
├── models/
│   └── intern.js
├── screenshots/
├── .env                 # Local secrets; not committed
├── .gitignore
├── index.js             # Express application and routes
├── package.json
├── package-lock.json
└── README.md
```

## Run Locally

### Requirements

- Node.js and npm
- A MongoDB Atlas cluster and database user
- Git

### Install dependencies

From the project directory:

```bash
npm install
```

### Configure environment variables

Create a local `.env` file in the project root:

```text
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Use the Atlas connection string for the `staymedia_practice` database. Keep real credentials private. `.env` is listed in `.gitignore` and must never be committed or pasted into public issues, screenshots, or chat.

### Start the server

```bash
node index.js
```

The local server uses port `3000` unless a `PORT` environment variable is set. Open [http://localhost:3000/](http://localhost:3000/) in a browser to see the welcome message.

## Data Model

The `Intern` Mongoose model uses the `interns` collection and defines:

| Field                    | Type    | Rules                        |
| ------------------------ | ------- | ---------------------------- |
| `name`                   | String  | Required                     |
| `role`                   | String  | Required                     |
| `department`             | String  | Defaults to `Engineering`    |
| `email`                  | String  | Optional                     |
| `active`                 | Boolean | Defaults to `true`           |
| `createdAt`, `updatedAt` | Dates   | Added by Mongoose timestamps |

MongoDB also assigns each document an `_id`.

## API Reference

| Method   | Path                 | Purpose                    | Successful response                    |
| -------- | -------------------- | -------------------------- | -------------------------------------- |
| `GET`    | `/`                  | Welcome message            | `200 OK`, text                         |
| `GET`    | `/interns`           | Read all intern documents  | `200 OK`, JSON array                   |
| `POST`   | `/interns`           | Create an intern document  | `201 Created`, JSON document           |
| `GET`    | `/interns/search`    | Search interns by name     | `200 OK`, JSON array of matches        |
| `DELETE` | `/interns/:id`       | Delete an intern by MongoDB ID | `200 OK`, confirmation and deleted document |

### Example: list interns

```http
GET /interns
```

### Example: create an intern

Send `Content-Type: application/json` with a JSON body:

```json
{
  "name": "Example Intern",
  "role": "Backend Intern",
  "department": "Web Development",
  "email": "intern@example.com",
  "active": true
}
```

The field names are case-sensitive for validation: use `name`, not `Name`. `active` should be a JSON boolean (`true` or `false`), not a quoted string.

### Example: search by name

Searches for a case-insensitive partial match. URL-encode the search value if it contains spaces or special characters.

```http
GET /interns/search?name=Godwin
```

The response is a JSON array. It is empty if no records match. A missing or blank `name` query returns `400 Bad Request`.

### Example: delete an intern

Use the MongoDB `_id` from a `GET /interns` response:

```http
DELETE /interns/PASTE_MONGODB_ID_HERE
```

The route returns `400 Bad Request` for an invalid ID and `404 Not Found` when no intern has that ID. A successful deletion returns `200 OK` with a confirmation message and the deleted document. Deletion is permanent.

The API also responds with `400 Bad Request` when Mongoose cannot create the submitted document and `500 Internal Server Error` if a database operation fails.

## Deploying on Render

The GitHub repository is connected to a Render Web Service.

- **Build command:** `npm install`
- **Start command:** `node index.js`
- **Port:** The application uses `process.env.PORT || 3000`; Render supplies `PORT`.
- **Environment variable:** Add `MONGODB_URI` in the Render service's environment settings. Do not commit the value.
- **Database networking:** Atlas must allow the Render service's outbound IP ranges. A laptop's current IP address is not the Render service's IP.

When diagnosing a deployment, check the Render service logs for `Connected to MongoDB` or `MongoDB connection failed`. The welcome route can work even when MongoDB is unreachable; `/interns` requires a successful database connection.

## Screenshots

Screenshots of setup, database records, API requests, and the live deployment are stored in [`screenshots/`](screenshots/). For example:

- [Express server running](screenshots/Server_Display.png)
- [Atlas database and collection](<screenshots/database and collection.png>)
- [Successful Postman GET request](screenshots/postman_GET_Interns_Request.png)
- [Successful Postman POST request](screenshots/MongoDB_express_POST_Request.png)
- [Live welcome page](screenshots/Live_Homepage.png)
- [Live interns endpoint](screenshots/Live_Interns_page.png)

Review screenshots for credentials, tokens, private URLs, or personal data before sharing them publicly.

## What I Learned

- How Node.js, npm, Express, MongoDB, and Mongoose fit together in a backend project.
- How to create a project with `npm init` and install dependencies.
- How HTTP `GET` and `POST` requests differ and how to inspect their status codes and bodies in Postman.
- How to search for interns by a case-insensitive partial name and delete a record by its MongoDB ID.
- Why request field names and JSON types must match the Mongoose schema.
- How to keep a database connection string in an ignored `.env` file.
- How database network allow-lists behave differently for a local computer and a cloud host.
- How to use Git and GitHub to version and share a project, then deploy it with Render.

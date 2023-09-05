# Goose-Track-06-Backend

The project builds RESTful APIs using Node.js, Express and Mongoose for creating a ToDos web app.

# Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

# Commands

Running in development:

```bash
npm run start:dev
```

Running in production:

```bash
npm start
```

# Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# Port
PORT = # default 3000

# URL of the Mongo DB
DB_HOST =

# Secret for generating passwords
SECRET_KEY =

# Cloudinary credentials
CLOUDINARY_NAME =
CLOUDINARY_KEY =
CLOUDINARY_SECRET =
```

# Project Structure

```
controllers\        # CRUD-operations controllers folder
 |--auth\           # Registration and authorization user controllers
 |--reviews\        # User reviews controllers
 |--tasks\          # Todos controllers
middlewares\        # Custom express middlewares
models\             # Mongoose models
routes\             # Routes
utils\              # Utility classes and functions
app.js              # Main app settings
server.js           # App entry point
swagger.json        # Swagger documentation
```

# API Endpoints

List of available routes:

**Auth routes**:\
`POST api/users/register` - Signup\
`POST api/users/login` - Signin\
`PATCH api/users/edit` - Update profile\
`GET api/users/current` - Profile\
`POST api/users/logout` - Logout

**Tasks routes**:\
`GET api/tasks?choosedMonth={XXXX-XX}` - Get tasks by month\
`POST api/tasks` - Create new task\
`PATCH api/tasks/{id}` - Update task\
`DELETE api/tasks/{id}` - Delete task

**Reviews routes**:\
`GET api/reviews` - Get all reviews\
`GET api/reviews/own` - Get own review\
`POST api/reviews/own` - Create own review\
`PATCH api/reviews/own` - Update own review\
`DELETE api/reviews/own` - Delete own review

# License

[MIT](LICENSE)

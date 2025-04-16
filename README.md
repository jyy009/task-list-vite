# Todo List

## Project Introduction

Built with React + Vite, node.js and MongoDB. Custom built backend using RESTful API that supports adding, getting and deleting todo entries.

## How to use the app

- Clone the repository
- Go to project directory and run:
  `npm install`
- Start the server
  `npm run dev`

## Features

### Vulnerabilities

Two vulnerabilities that my project has are:

1. Malicious requests

The API for tasks and projects both have a DELETE endpoint where I use `isValidObjectId()` to check if the request paramameter is a valid 24-character hex ObjectId that MongoDB creates and uses for each document.

If the check returns an invalid ID, the endpoint immediately gives an error with a 400 status code and avoids unecessary database queries.

If the check returns a valid ID, the code uses `findByIdAndDelete()` which expects an ObjectId and casts it to an ObjectId. Validating the input first avoids any errors or unexpected behavior at this step. It also prevents malicious inputs to be used as query filters.

In contrast, if I didn't validate the user input and directly passed it to a method like `findOneAndDelete()`, malicious inputs e.g., `{"$ne":null}` can manipulate the query and delete documents where any field is not equal to 'null', which is any document.

For the POST endpoints, I used `express-validator` to validate and sanitize the structure of the requests before it reaches the database. Ensuring the data is checked against certain rules before it reaches the route handler will prevent malicious input reaching the database while also validation the user input. 

The task and project schema's are also validated to ensure that the data is validated when saving the data to the database. Using the middleware and schema validation provides extra security against malicious input and malformed data.

2. Identification and Authentication Failures

The app does not require the user to log in to use it. This poses serious vulnerabilities, e.g.:

- Anyone can access or modify the data
- Use bots to flood the database
- Store and leak private information if anyone did add private data

User authentication could allow the app to only show tasks added by that user, preventing data leaks.

### Tracking
Implemented Google Analytics to track how the website is used. I did not

### SEO/Accessibility

The SEO-friendliness, the app uses semantic HTML.

Descriptive "aria-label" where needed to ensure readers understand the purpose of certain elements.

Unique input fields- I added a unique `_id` for each input and label to properly associate them.

Implmented form messages to the UI when the task or project has or has not been successfully added.

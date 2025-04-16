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

The API for tasks and projects both have a DELETE endpoint where I use ``` isValidObjectId() ``` to check if the request paramameter is a valid 24-character hex ObjectId that MongoDB creates and uses for each document.

If the check returns an invalid ID, the endpoint immediately gives an error with a 400 status code and avoids unecessary database queries.

If the check returns a valid ID, the code uses ``` findByIdAndDelete() ``` which expects an ObjectId and casts it to an ObjectId. Validating the input first avoids any errors or unexpected behavior at this step. It also prevents malicious inputs to be used as query filters.

In contrast, if I didn't validate the user input and directly passed it to a method like ``` findOneAndDelete() ```, malicious inputs e.g., ``` {"$ne":null} ``` can manipulate the query and delete documents where any field is not equal to 'null', which is any document.

2. Identification and Authentication Failures

The app does not require the user to log in to use it. This poses serious vulnerabilities, e.g.:

- Anyone can access or modify the data
- Use bots to flood the database
- Store and leak private information if anyone did add private data

User authentication could allow the app to only show tasks added by that user, preventing data leaks.

### Tracking

### SEO/Accessibility

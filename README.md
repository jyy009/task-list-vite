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

The API for tasks and projects both have a DELETE endpoint where users can delete a task or project. In both endpoints, I first use

```
isValidObjectId()
```

to check if the input from the request paramameter is a valid MongoDB ObjectId. If it's not a valid ObjectId, the code will stop early and return a 404 status code instead of unecessarily querying the database.

If the request parameter is a valid ObjectId, then I use

```
findByIdAndDelete()
```

which type casts the request parameter to be an ObjectID. Having this check prevents malicious requests. If I didn't have object validation, and used only

```
findOneAndDelete()
```

instead, and the user tried to send a malformed input such as an object like

```
{"$ne":null}
```

to delete a document, Mongoose interprets this as a filter method where any field is not equal to 'null' which is any document. It then can go on to delete that document.

2. Identification and Authentication Failures

The app does not require the user to log in to use it. This poses serious vulnerabilities, e.g.:

- Anyone can access or modify the data
- Use bots to flood the database
- Store and leak private information if anyone did add private data

User authentication could allow the app to only show tasks added by that user, preventing data leaks.

### Tracking

### SEO/Accessibility

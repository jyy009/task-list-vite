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

### SEO/Accessibility

Two vulnerabilities that my project has are:

1. Malicious requests

The API for tasks and projects both have a DELETE endpoint where users can delete a task or project. In the endpoint, I use

```
isValidObjectId()
```

to check if the input from the request paramameter is a valid MongoDB ObjectId. If it's not a valid ObjectId, the code will stop early and return a 404 status code instead of unecessarily querying the database.

If the request parameter is a valid ObjectId, I then use

```
findByIdAndDelete()
```

instead of

```
findOneAndDelete()
```

because it treats the request parameter as a string. to again ensure that the request paramater matches the ObjectID, which should always be a string.
Having this check prevents malicious requests, e.g., if a user sent a query object to delete a document where the id is not equal to 'null', which is any document in the database. Therefore, eventually, all of the data in my database could be deleted.

2. Identification and Authentication Failures

The app does not require the user to log in to use it. This poses serious vulnerabilities, e.g.:

- Anyone can access or modify the data
- Use bots to flood the database
- Store and leak private information if anyone did add private data

### Tracking

### Vulnerabilities

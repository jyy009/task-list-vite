# Task Tracker

## Project Summary

A task tracker app where users can organize their task list. Built with React + Vite, node.js and MongoDB. Custom built backend using RESTful API that supports adding, getting and deleting todo entries.

User can add a project category for which the tasks can be organized into. User can create a new task, view all tasks, view tasks by category, and delete tasks.

## How to run

- Clone the repository
- Go to the project directory and run:
  `npm install`
- Then start the server:
  `npm run dev`
- Connection string to remote database is provided via submission form. I have allowed 'any connection' in Atlas.

## Features

### Security

Two vulnerabilities that my project has are:

1. Malicious requests

The API for tasks and projects both have a DELETE endpoint where I use `isValidObjectId()` to check if the request paramameter is a valid 24-character hex ObjectId that MongoDB creates and uses for each document.

If the check returns an invalid ID, the endpoint immediately gives an error with a 400 status code and avoids unecessary database queries.

If the check returns a valid ID, the code uses `findByIdAndDelete()` which expects an ObjectId and casts it to an ObjectId. Validating the input first avoids any errors or unexpected behavior at this step. It also prevents malicious inputs to be used as query filters.

In contrast, if I didn't validate the user input and directly passed it to a method like `findOneAndDelete()`, malicious inputs e.g., `{"$ne":null}` can manipulate the query and delete documents where any field is not equal to 'null', which is any document.

For the POST endpoints, I used `express-validator` to validate and sanitize the structure of the body request before it reaches the database. Ensuring the data is checked against certain rules before it reaches the route handler will prevent malicious input reaching the database while also validating the user input.

The task and project schema's are also validated to ensure that the data is correct when saving to the database. Using the middleware and schema validation provides extra security against malicious input and malformed data.

2. Identification and Authentication Failures

The app does not require the user to log in to use it. This poses serious vulnerabilities, e.g.:

- Anyone can access or modify the data
- Use bots to flood the database
- Store and leak private information if anyone did add private data

User authentication could allow the app to only show tasks to the user added by that user, preventing data leaks.

### Tracking

Implemented Google Analytics (GA) to track page views, number of visitors, and general user location to gain knowledge on the traffic of the website. GA focuses on not logging IP addresses and data deletion to better align with GDPR regulations.

I also addded a custom click event to the project form submit to track the most commonly created project names and possibly have those projects pre-added for better user experience. There usually is no personal data when creating project names, therefore the custom event is not a huge infringement upon user privacy. Although, a user could add private information if desired.

### SEO/A11y

For SEO:

- App uses semantic HTML to give meaning to the page structure and to make it easier for search engines to read the page.
- Used a description meta tag to give a summary of the content of the app to encourage CTR.

For accessibility:

- Descriptive `aria-label` and `area-labelledby` are used to ensure assistive technology can better understand and associate the purpose of elements.
- Added unique input fields by adding `_id` for input and label elements to properly associate them to the relevant task or project.
- Implmented form messages to the UI when the task or project has or has not been successfully added for screen readers.

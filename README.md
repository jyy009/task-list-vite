# Task Tracker

## Project Summary

A task tracking app where users can organize their tasks. Built with React + Vite, node.js and MongoDB. The custom RESTful API supports creating, retrieving and deleting tasks.

Users can group tasks into projects, create new tasks, view all tasks or filter them by project category, and delete tasks.

## How to run

- Clone the repository
- Go to the project directory and run:
  `npm install`
- Then start the server:
  `npm run dev`
- Connection string to remote database is provided via submission form. "Any connection" in Atlas added.

## Features

### Security

Two vulnerabilities that my project has are:

1. Malicious requests

The API for tasks and projects both have a DELETE endpoint where I use `isValidObjectId()` to check if the request paramameter is a valid 24-character hex ObjectId that MongoDB creates and uses for each document.

If the check returns an invalid ID, the endpoint immediately gives an error with a 400 status code and avoids unecessary database queries.

If the check returns a valid ID, the code uses `findByIdAndDelete()` which expects an ObjectId and casts it to an ObjectId. Validating the input first avoids any errors or unexpected behaviors at this step. It also prevents malicious inputs to be used as query filters.

In contrast, if I didn't validate the user input and passed it directly to methods like `findOneAndDelete()`, malicious users can send input like `{"$ne":null}`. This can manipulate the query to match any document (since every field is not equal to `null`), resulting in unintended deletions.

For the POST endpoints, I used `express-validator` to validate and sanitize the structure of the request bodies before reaching the database. Checking the user input against certain rules will prevent malicious input being processed.

The task and project schema's are also validated to ensure that the data is correct when saving it to the database. Using the middleware and schema validation provides extra security against malicious input and malformed data.

2. Authorization and Authentication Failures

The app does not implement user authentication or authorization which poses serious vulnerabilities such as:

- Anyone can access, view or modify the tasks and potentially sensitive information leading to privacy violations and data leaks.
- Malicious users can automate attacks to flood the database.

User authentication/authorization could help resolve these issues and also create user accountability.

### Tracking

Implemented Google Analytics (GA) to track page views, number of visitors, and general user location to gain knowledge on website's traffic. GA focuses on not logging IP addresses and data deletion to better align with GDPR regulations.

I also addded a custom click event to the project form submit to track the most commonly created project names and possibly have those projects pre-added for better user experience and optimization. There usually is no personal data when creating project names, therefore the custom event is not a huge infringement upon user privacy. Although, a user could add private information if desired.

### SEO/A11y

For SEO:

- App uses semantic HTML to give meaning to the page structure and to make it easier for search engines to read the page.
- Used a description meta tag to give a summary of the content of the app to encourage CTR.

For accessibility:

- Descriptive `aria-label` and `aria-labelledby` are used to ensure assistive technology can better understand and associate the purpose of elements.
- Added unique input fields by adding `_id` for input and label elements to properly associate them to the relevant task or project.
- Implmented form messages to the UI when the task or project has/has not been successfully added for screen readers.
- Analyzed page on lighthouse for a score of '100' on accessibility.

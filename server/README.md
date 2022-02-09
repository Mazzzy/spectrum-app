# Spectrum app Backend
## Project overview
This repo is the codebase for the backend of spectrum app. 

## Implementation details
It has implemented to provide REST APIs with below endpoints:

-   GET `/areas` returns area list with names and frequencies (x-axis ranges for corresponding area item).
-   GET `/areas/:id` returns specific area item by Id.
-   POST `/areas` creates new passed area item inside the storage (json).
-   PATCH `/areas/:id` updates the area item by id.
-   DELETE `/areas/:id` deletes the area item by id.
-   GET `/spectrum` returns all available spectrum list.
-   GET `/spectrum/{:area}` return spectrums in frequencies range (x-axis ranges) of given area.

Also versioning is made and APIs are accessed via `/api/v1`. Also error handling is added for respective routes based on scenarios.
## Technology stacks

__Core__
- NodeJS: for backend logic handling.
- Express: for routing and abstract logic.

__Libraries__
- ``helmet`` - for setting security in http headers.
- ``morgan`` - for development logging.
- ``cors``   - for cross origin request specific to given url.
- ``xss-clean`` - for data sanitization against XSS.
- ``hpp`` - for preventing parameter pollution.
- ``dotenv`` - for loading env vars from .env file.
- ``nodemon`` - for auto reload in dev mode.

__Tools__
- ``eslint`` & ``prettier`` - for formatting and beautifying code.

## How to use
Go to root directory `server` and Execute commands with `npm`.
### Installing the application
- If node is not installed then Install [node] (https://nodejs.org/en/download/)
- Run the following command to load all the module dependencies for app:
```bash
npm install
```
### Running the app
- To start the app in local environment/dev mode, run the command:
```bash
npm run dev
```
- To start the app in prod mode, run the command:
```bash
npm run prod
```

## Project folder structure
```bash
├── src
│   ├── controllers
│   ├── data
│   ├── loaders
│   ├── routes
│   ├── utils
├── index.js
├── README.md
├── .eslintrc
├── package.json
├── package-lock.json
```

__controllers__ 

Contain logic functions.

__data__

Contain JSON files, used as storages for areas and spectrum data.

__loaders__

Contain express configuration and initialization.

__routes__

Contain RESTful routes

__utils__

Contail help functions and classes that helps to apply DRY principle.

# Spectrum app Frontend
## Project overview
This repo is the codebase for the frontend of spectrum app. 

## Implementation details
It displays view having header, list of fetched areas and line chart that shows spectrum data based on area selection. It consumes the API implemented under server (areas and spectrum). Below is basic set of features covered,

- User is able select different areas of interest (areas list)
- A subset of the spectrum data corresponding to the selected area visualized to the user in chart
- The x-axis shows the frequencies corresponding to the selected area
- The y-axis shows the signal intensity in Ks corresponding to the selected area
## Technology stacks

__Core__
- React, TypeScript, SASS, HTML5.

__Libraries__
- ``victory`` - for data visulaizations (charts).
- ``react-icons`` - for free icons across app.

__Tools__
- ``eslint`` with strict type-check & ``prettier`` - for formatting and beautifying code.
- LocalStorage for persisting theme mode at client's machine.

## How to use
Go to root directory `client` and Execute commands with `npm` or `yarn`.
### Installing the application
- If node is not installed then Install [node] (https://nodejs.org/en/download/)
- Run the following command to load all the module dependencies for app:
```bash
npm install
```
Or
```bash
yarn
```
### check lint related errors
```bash
npm run lint
```
Or
```bash
yarn lint
```
It runs ESLint and shows lint specific errors across the application.
### Running the app
- To start the app in local environment/dev mode, run the command:
```bash
npm run start
```
Or
```bash
yarn start
```
It runs the react based app in the development mode. Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.

## Project folder structure
```bash
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── styles
│   ├── types
│   ├── utils
│   ├── views
├── App.test.tsx
├── App.tsx
├── index.tsx
├── react-app-env.d.ts
├── setupTests.ts
├── .env
├── .eslintrc
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
```

__assets__ 

Contain images (logo).

__components__ 

Contain shareable components - button, error, loading.

__config__ 

Contain configurations - constants.

__styles__ 

Contain common styles - reset, utilities etc.

__types__ 

Contain types of data used in application - areaType, fetchHooksType, spectrumType.

__utils__ 

Contain utilities for localStorage, custom-hooks for API calling etc.

__views__

Contain main views - dashboard, layout. The main views contains respective child views.

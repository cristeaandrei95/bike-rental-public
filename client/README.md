# Architecture documentation

The application structure was designed on top of create react app.


Application

This folder should contain all the functionality required at a global level. Therefore, a few elements that would fit this criteria would be:

- global Errors like toasts, notifications or even application error boundaries.
- global styling
- components library wrapper of choice and it’s themeing configuration.
- router
- custom routing components ex. ProtectedRoute
- global types
- etc.


Assets

This folder should contain subfolders for assets like

- icons
- images
- fonts
- etc.


Components

This folder should contain only stateless components which receive props from other components or containers.


Containers

In this architecture, container components, otherwise named Stateful components, should hold state and compose the UI using components.


Environments

This folder should hold all files holding environment depending config variables.


Hooks

This folder should contain all reusable react hooks.


Pages

Just regular website pages.


Services

Services in this architecture are files containing a set of related functions which allows the developer to interact with a specific entity.
Services in a React & Redux architecture should preferably be functional (avoid objects, write functions) and should not hold any form of state (that is redux’s job).


Store

Uses redux-toolkit and holds the application’s state.


Utils

Contains reusable utility functions.


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build:dev || npm run build:qa || npm run build:stg || npm run build:prod `

Builds the app for the specified environment to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

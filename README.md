# WouldYouRather Project

This Project, is web app that lets a user play the “Would You Rather?” game. In the app user can asked a question in the form: “Would you rather [option A] or [option B] ?”. User or other users can answer a question by select one option from two options. User can only answer a question once.

In this app, user can view the questions has answered and has not answered. He/she can see how other users votes, post question and see the vote ranking of users on leadboard.

To use this app, user will need login and there an option to register new user.

## Installation

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Backend Server
* The data are store in dababase [`_DATA.js`](scr/utils/_DATA.js)

To request data from database APIs [`api.js`](scr/utils/api.js)

* [`getInitialData`](#getInitialData)
* [`saveQuestion`](#saveQuestion)
* [`saveQuestionAnswer`](#saveQuestionAnswer)
* [`saveUser`](#saveUser)

### `getInitialData`

Method Signature:

```js
getInitialData()
```

* Returns a Promise which resolves to a JSON object containing a collection of question objects and user object.
* This collection represents the questions and users currently in the app.

### `saveQuestion`

Method Signature:

```js
saveQuestion(info)
```

* info: `<Object>` containing at minimum an `optionOneText`, `optionTwoText` and `author` attribute
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `saveQuestionAnswer`

Method Signature:

```js
saveQuestionAnswer(info)
```

* info: `<Object>` containing at minimum an `authedUser`, `qid` and `answer` attribute

### `saveUser`

Method Signature:

```js
saveUser(info)
```

* info: `<Object>` containing at minimum an `id`, `name` and `avatar` attribute

## Important
The backend API uses a fixed set of cached data. When user refreshes the page, only default data will shown.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

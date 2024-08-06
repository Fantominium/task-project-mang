# Run application using command

`node server.js`
Do this from the root directory after running `npm install` first to get the necessary packages.

## Mongo creds

These are specific to the user I set up, and access is only available at max for 1 week.

## NB

I was unable to tackle filter task by project name and bonus items due to time constraints

## Todo Endpoints

GET http://localhost:3000/api/todos
    -
POST http://localhost:3000/api/todos
    `{  "todoName": "YourNameHere",
  "todoCompleted": false}`

GET http://localhost:3000/api/todos/id
   -

GET http://localhost:3000/api/todos/search?name=YourNameHere
    -

PUT http://localhost:3000/api/todos/id
    `{
    "todoName":"YourUpdatedNameHere"
}`

DELETE http://localhost:3000/api/todos/id
    -

GET http://localhost:3000/api/todos/sort/due-date
    -

GET http://localhost:3000/api/todos/sort/create-date
    -

GET http://localhost:3000/api/todos/completed-date
    -

PATCH http://localhost:3000/api/todos/:id/toggle-completed
    -

POST http://localhost:3000/api/todos/assign
    `{
    "todoName":"060524",
    "projectName": "Project A"
}`

## Project Endpoints

GET http://localhost:3000/api/projects
    -
POST http://localhost:3000/api/projects
    `{
    "projectName": "YourNameHere"
}`

GET http://localhost:3000/api/projects/search?name=YourNameHere
    -

GET http://localhost:3000/api/projects/id
    -

PUT http://localhost:3000/api/projects/id
    `{
    "projectName": "YourUpdateNameHere",
    "projectEndDate": "2024-09-06T07:07:44.511Z"
}`

DELETE http://localhost:3000/api/projects/id
    -

GET http://localhost:3000/api/projects/sort/due-date
    -

GET http://localhost:3000/api/projects/sort/create-date
    -

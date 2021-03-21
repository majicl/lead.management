# Lead Management

## A lead management UI for a tradie.

## Folder Structure Overview
```
.
+-- server (backend)
|   +-- Dockerfile
|   +-- ...config
|   +-- src
+-- ui (frontend)
|   +-- ...config
|   +-- src
+-- docker-compose.yml
```

## Solution Design
The solution consists of two main projects. One handles the backend part based on `asp.net core` and tries to provide APIs which are needed for the client to show the leads and also push notifications with any status changes via `SignalR`. and the other one is responsible to handle the UI, show the list of invited and accepted leads and listen to the socket pushes, and act based on that.

My main focus was to minimize api calls and keep everything lazy to load despite everything is getting updated!

The default tab `(Invited)` data is initiated and rendered at once. The other tab `(Accepted)` data is loaded when you click on its tab for the first time. after that, if any tabs clicked, there is not api call anymore and the only way for calling api is the push notification trigger.

if the page gets refreshed, the last opened tab will be rendered not the default tab and of course with the same lazy loading behavior. (getting help of `react router` to synchronize tab selection with route)

Every signalR push notifications make all the clients aware of changes and the client will update the tabs item(s) count and just update the leads list of the opened tab (please watch 30 seconds gif below).

!["Push Notification and Lazy Loading"](https://raw.githubusercontent.com/majicl/lead.management/master/docs/socket.gif)

I've used `Redux` to managing states in the front-end. I could NOT use any state management for this but it made my life easier and cleaner. another option was using a reactive programming library like `RxJs` or `redux-observable`.

there is a basic error handling in the front-end in order to show a message if any api call throws and `<ErrorBoundary />` for any runtime error.

!["Error"](https://raw.githubusercontent.com/majicl/lead.management/master/docs/error.png)

I could use css preprocessors like `sass` or `styled-components` library to having a beeter management is styles and theming but I found the `css` sufficient for it.

I've tried to follow `the clean architecture` in the backend and used `MediatR` to follow `mediator pattern`.

In the MediatR handlers the desired data is fetched from Repository and mapped to the desired `DTO`. (I could use `AutoMapper`).

I've used `Dapper` to connect to the db and execute my db queries. I don't like to write sql queries as string in the code but since the db communication wasn't so many I decided to use Dapper. I usually use an `ORM` like `entity-framework` unless I find limitation. 

I'vr

You can find the back-end API documentation in its configured swagger on http://localhost:5000/swagger.

!["Error"](https://raw.githubusercontent.com/majicl/lead.management/master/docs/swagger.png)

## Todo
- More unit-tests in the front-end and backend
- Make the components more efficient
- Make the error handling better (.e.g if socket gets down)
- Enhance the UI
- Clean up packages
- Make it production ready
## How to run
### Single command
#### Depandancies
- docker version 20.10.5
- docker-compose version 1.28.5

Run the following command in the root folder:
```
docker-compose up --build
```

Open http://localhost:3000 to view it in the browser.

::: warning
*Since in the docker-compose running the UI application depends on the API service and the API service depends on the db, it takes a while for the UI to getting up and running!*
:::

!["Fully Loaded"](https://raw.githubusercontent.com/majicl/lead.management/master/docs/docker-compose-log.png)

### Run Individually

#### Depandancies

- dotnet version 5.0
- yarn version 1.22.10

Run the following command in the ./server/src/Lead.Management.API folder:
```
dotnet restore && dotnet run
```
The API service will be available on http://localhost:5000

::: warning
*Make sure you have the database connection-string configured in the appsettings.Development.json*
:::

And run the following command in the ./ui folder:
```
yarn && yarn start
```
The UI will be available on http://localhost:3000

## Available scripts in the client project
Run the following command in the ./ui folder:
Running the unit-tests

```
yarn test
```
```
yarn test:coverage
```
```
yarn start
```
```
yarn build
```
```
yarn lint
```
```
yarn lint:fix
```

## Frameworks and Libraries
In the backend: asp.net core 5.0, MediatR, MySql.Data, SignalR, Dapper, Moq, xunit

In the frontend: React, Redux, microsoft/signalr, babel, webpack, jest, testing-library
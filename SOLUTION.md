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

- dotnet version v5.0
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
In the backend: asp.net core 5.0, MySql.Data, SignalR, Dapper, Moq, xunit

In the frontend: React, Redux, microsoft/signalr, babel, webpack, jest, testing-library
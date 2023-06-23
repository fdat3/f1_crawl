# nodejs-express-craw-f1

Here is the server craw data from the formula1.com site including:

1. All data of teams ( 2022 - 2023 ): working and not work (10 records).
2. All data of drivers ( 2022 - 2023 ): working and not working (24 records).
3. All races from 2022 to 2023:  (30 records).
4. All race results from 2022 to 2023: (601 records).

###### recomend using: Nodejs v14.21.3, TypeScript v5.0.4

# How to run server from local

1. Check node version(14.21.3) and TypeScript [https://www.npmjs.com/package/typescript/v/5.0.4](https://www.npmjs.com/package/typescript/v/5.0.4)
2. install [https://www.npmjs.com/package/sequelize-cli](https://www.npmjs.com/package/sequelize-cli) to migrate Database
3. install postgresql
4. Prepare .env file connect to database
5. run `npm install`
6. Run `npm run start:dev` or parallel (`npm run watch-ts` + `npm run watch-babel`) ==> Run server local
7. Run `npm run db:migrate` ==> this command is migrate database **(important)** or you can import database from file &#96;databaseCrawedDataF1&#96;

# How to migrate database

1. Run `npm run db:migration nameOfFile.js` (please replace nametable and Update migrate file content)
2. Run `npm run db:migrate` this command is migrate database(impotant)
3. Run `npm run db:migrate:undo` undo latest migration file

### Folder Structure Conventions

    ├── build                   # Compiled files (`npm run watch-ts` or npm run start:dev`) for local
    ├── dist                    # Compiled files (npm run build) for prod
    ├── src
        ├── index.ts            # app index
        ├── server.ts           # server: run multi core by cluster
        ├── common              # managerment and config sequelize ORM, Mirgation
        ├── config              # Define value for Development and Production
        ├── controllers         # management Logic code folder
        ├── interfaces          # management Interfaces for project
        ├── middlewares         # management Middlewares(query, auth,...)
        ├── model               # management : sequelize define Model and config database
        ├── router              # management : Define RestAPIs and custom APIs
        ├── services            # management Logic code folder
        ├── types               # management func validate,...
    ├── .env                    # enviroments file
    ├── .                       # config file
    ├── .                       # config file
    ├── LICENSE
    └── README.md

### How To Use APIs

- Refer to ERD image: erd-diagram.png
- If you use an empty database, you can sync data by calling the api: 
[http://localhost:4000/api/v1/race/crawl-driver/:name] --> To crawl driver
[http://localhost:4000/api/v1/race/crawl-team/:fullname_team] --> To crawl team

1. fields: it's an array, you can get the columns you need or all with ?fields=["$all"] and you can join table
   **example 1:** [http://localhost:4000/api/v1/race?fields=["grand_prix"]](http://localhost:4000/api/v1/race?fields=["grand_prix"])

```json
{
  "id": "....",
  "updatedAt": "....",
  "grand_prix": "Spain"
}
```

**Example 2:** [http://localhost:4000/api/v1/race?fields=["$all"]](http://localhost:4000/api/v1/race?fields=["$all"])
The response is:

```json
{
  "id": "xx",
  "grand_prix": "Belgium",
  "date": "2022-08-28T05:00:00.000Z",
  "year": 2022,
  "createdAt": "xx",
  "updatedAt": "xx",
  "deletedAt": null
}
```

**example 3:** Join table [http://localhost:4000/api/v1/race?fields=["$all",{"results":["$all",{"driver":["$all"]}]}]](http://localhost:4000/api/v1/race?fields=["year",{"result":["$all",{"driver":["$all"]}]}])

```json
{
  "id": "xx",
  "grand_prix": "Spain",
  "date": "2023-06-04T05:00:00.000Z",
  "results": [
    {
        "id": "xxx",
        "data_result": "data_result",
        {
            "driver": 
            {
                "id": "xxx",
                "data_driver": "data_driver"
            }
        }
    }
  ]
}
```

### 2. Page : you can specify the page in the api

**Example 1:** [http://localhost:4000/api/v1/race?fields=["$all"]&page=1](http://localhost:4000/api/v1/race?fields=["$all"])

### 3. Limit : you can specify the limit in the api

**Example 1:** [http://localhost:4000/api/v1/race?fields=["$all"]&limit=10](http://localhost:4000/api/v1/race?fields=["$all"])

### You can use limit and page in api

[http://localhost:4000/api/v1/race?fields=["$all"]&limit=10&page=1](http://localhost:4000/api/v1/race?fields=["$all"])

### 4. Where: you can join the table looking for everything with the condition

**example 1:** query with conditon grand_prix:"Spain"
[http://localhost:4000/api/v1/race?fields=["$all"]&where={"grand_prix":"Belgium"}](http://localhost:4000/api/v1/race?fields=["$all"]&where={"grand_prix":"Belgium"})
The resuli is

```json
{
  "count": 1,
  "rows": [
    {
      "id": "xx",
      "grand_prix": "Belgium",
      "date": "xx",
      "year": 123,
      "createdAt": "xx",
      "updatedAt": "xx",
      "deletedAt": null
    }
  ]
}
```

**example 2:** query join table
`http://localhost:4000/api/v1/driver?fields=["$all",{"team":["$all"]}]&where={"$team.fullname_team$":"Scuderia Ferrari"}`
or
`http://localhost:4000/api/v1/driver?fields=["$all",{"team":["$all"]}]&where={"$team.fullname_team$": {"$eq":"Scuderia Ferrari"}}`
**Detail:** get all drivers in the team "Scuderia Ferrari"
_You can refer to more operations at:: https://sequelize.org/docs/v6/core-concepts/model-querying-basics_

### 5. order: you can sort the position of the main table or the child table

**example 1:** api get raking of a race
[http://localhost:4000/api/v1/result?fields=["$all",{"driver":["$all"]},{"race":["$all"]}]&where={"$race.grand_prix$":"Bahrain"}&order=[["pos","asc"]]](http://localhost:4000/api/v1/result?fields=["$all",{"driver":["$all"]},{"race":["$all"]}]&where={"$race.grand_prix$":"Bahrain"}&order=[["pos","asc"]])

### 6. Postman API docs

you can import JSON postman to see all the api I wrote available:
`f1_api.json`
or you can use this link:
['postman-link']

    ├── Races                   # RESTful API of Race and custom api
    ├── Sync data from F1       # APIs for sync data
    ├── Results                 # RESTful API of race and custom api
    ├── Teams                   # RESTful API of Team and custom api
    ├── Drivers                 # RESTful API of Driver and custom api
    ├── Result                  # APIs statistics and simulation of page-like response data: https://www.formula1.com/en/results.html

If you have problems running the project, I have published it on a VPS and you can test the API with this host: http://141.164.63.209:4000

# luxonis-project

Scrape the first 500 items (title, image url) from https://www.sreality.cz/en (flats, sell)
and save it in the Postgresql database. Then the ads are displayed on http://127.0.0.1:8080 page.

The project is using Node.js & Express for the server API and Next.js for the frontend.

```bash
luxonis-project/
├── api        # API Server
├── client     # Frontend Next.js App
├── docker-compose.yml
```

## Running Locally

You can checkout project locally by cloning the repo:

```bash
docker-compose up 
```

You can also run the api and client manually.

First run only Postgres DB in Docker.

```bash
docker-compose up postgres -d
```

##### API Server

```bash
cd api
npm install
npm run prisma:generate
npm run prisma:migrate
```

In another terminal window you need to run `npm run watch`, which watches for your code changes 
and compile TypeScript to JavaScript.

To run development: `npm run start:dev` (`watch` command have to be running so to see changes).

##### Client

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

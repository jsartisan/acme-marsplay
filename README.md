## Getting Started

### 1. Clone Repo
1. Clone the repo and take the latest pull from master branch.

```bash
git pull origin master
```
### 2. Install Dependencies
Make sure you have node/npm and postgres installed on your machine.

Install the node dependencies

```bash
yarn
```
### 3. Environment Variables

The app uses some environment variables to be able to run. So create a new file .env and paste the following code into it with correct database name, username and password.

```
APP_PORT=8000
APP_URL=<app-url based on environment>
NODE_ENV=development
PRINT_API_URL=

DB_CONNECTION=postgres
DB_HOST=<db-host>
DB_PORT=<db-port>
DB_DATABASE=<db-name>
DB_USERNAME=<db-username>
DB_PASSWORD=<db-password>
```
### 4. Run migrations

Now run the migrations that will create table in our database

For more commands of sequlize migrations, follow - http://docs.sequelizejs.com/manual/tutorial/migrations.html

```bash
node_modules/.bin/sequelize db:migrate

or

NODE_ENV=development node_modules/.bin/sequelize db:migrate
```

### 5. Run the project.
Finally run the project with the following command.
```bash
npm start
```

*NOTE: The project uses cron jobs to scrape data from json api which is set to run every hour. You can change the time in the files in ```/app/commands``` folder*

# GraphQL-API-analysis

GraphQL API

### to install packages

npm install

### from the root of the repository, run

npm start

### From the profiler repository, run

npm install

npm run-script clean-build

npm run-script build

npm run-script postbuild

./dist/cli.js --schema ../GraphQL-API-analysis/src/schema/operation.graphql --endpoint=http://localhost:3000/graphql

### PostgreSQL

$ postgres --version
postgres (PostgreSQL) 14.6 (Homebrew)

$ initdb /usr/local/var/postgres

Success. You can now start the database server using:

    pg_ctl -D /usr/local/var/postgres -l logfile start

createdb mydatabase # to create
dropdb mydatabase # to delete
psql mydatabase # connect to db using psql
\list - List all of your actual databases.
\c mydatabase - Connect to another database.
\d - List the relations of your currently connected database.
\d mytablename - Shows information for a specific table.

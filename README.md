
# Vidly Node Express API

Following Mosh's tutorial to build a Vidly REST API


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_PORT=27017`

`MONGO_PASSWORD=`

`MONGO_USER=`

`MONGO_DATABASE=vidly`

`NODE_ENV=development`

`PORT=3001`

`MONGO_HOST=localhost`


## Installation Bare Metal

Clone the repo

```bash
git clone <repo_url>
```

Install required packages

```bash
cd <project_folder>
npm install
```

Setup Local Mongo DB

## Installation Docker

Build the api image and create a standalone container

```bash
docker build -t <docker-username>/vidlyapi .

docker images or docker image ls

docker run -d -p 5003:3001 --name vidlyapi
    -e MONGO_PORT=27017
    -e MONGO_PASSWORD=some_password
    -e MONGO_USER=root
    -e MONGO_DATABASE=vidly
    -e NODE_ENV=development
    -e PORT=3001
    -e MONGO_HOST=localhost 
    <docker-username>/vidlyapi

docker ps

docker ps -a

docker start <continer_name/id>

docker stop <container_name/id>
```

The docker-compose file contains mongodb and mongoexpress configuration.
Run the following commands to get the api and database up and running

```bash
docker-compose -f docker-compose.yml up -d [--build]
```

To see running containers

```bash
docker-compose ps 

or 

docker ps
```

To stop multicontainer

```bash
docker-compose down
```

## Connect to Mongo 

```bash
mongo admin -u <username> -p <password>

show dbs

use <database>

show collections

db.collection_name.find()

db.collection_name.save({'name': 'Sony computer'});

db.version()
```

    
## Authors

- [@Salvation Lloyd Stanley-Kemuel](https://www.github.com/skemuel007)


## Appendix

If any issues setting up this project, kindly reachout to me by raising an issue


## License

[MIT](https://choosealicense.com/licenses/mit/)


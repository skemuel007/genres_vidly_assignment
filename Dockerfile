# get the base image
FROM node:latest

# create app director
RUN mkdir -p /usr/src/app

# set working director
WORKDIR /usr/src/app

# copy package.json file
COPY package.json .

# install npm packages
RUN npm install

# copy the source code to working dir
COPY . .

EXPOSE 5003

CMD ["node", "index.js"]
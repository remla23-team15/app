## Specify the base image
#FROM node:16
#
## Set the working directory
#WORKDIR /app
#
## Copy the package.json and package-lock.json files
#COPY package*.json ./
#
## Install dependencies
#RUN npm install
#
## Copy the rest of the application code
#COPY . .
#
## Specify the command to start the application
#CMD ["npm", "start"]

# Specify the base image
FROM nginx:alpine

# Copy the nginx configuration file
#COPY nginx.conf /etc/nginx/nginx.conf

# Copy the application code to the default Nginx root directory
COPY . /usr/share/nginx/html
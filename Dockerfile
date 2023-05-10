# Use official node image as the base image
FROM node:lts-alpine as build

ARG npm_token
ENV NPM_TOKEN $npm_token

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Use official nginx image as the base image
FROM nginx:stable-alpine

# Configure Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/src /usr/share/nginx/html

# Expose port 80
EXPOSE 80

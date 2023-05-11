# Use official node image as the base image
FROM node:lts-alpine as build

ARG npm_token
ENV NPM_TOKEN $npm_token

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Use official nginx image as the base image
FROM nginx:stable-alpine

# Configure Nginx
COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template

# Copy the build output to replace the default nginx contents
COPY --from=build /usr/local/app/src /usr/share/nginx/html

# Copy docker entrypoint
COPY docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh

# Expose port 80
EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

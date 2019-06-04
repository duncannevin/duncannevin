# Specify a base image: use alpine version for smallest version possible
FROM node:alpine

# Set a working directory in container
WORKDIR /usr/app

# Copy package json for working directory. 
# Doing this so that changes to the application don't require a re-install of the dependencies.
COPY ./package.json ./

# Install dependencies
RUN npm install

# Move the rest of the application to the working directory
COPY  ./ ./

# Specify start command
CMD [ "npm", "start" ]

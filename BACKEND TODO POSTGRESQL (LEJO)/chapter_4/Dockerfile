# Use an official node js runtime as a parent image
FROM node:22-alpine

#Seet the working directory in the container
WORKDIR /app

#Copy the package.json and the package-lock.json files to the container
COPY package*.json .

#install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

#Expose the port that the apps run on
EXPOSE 5000 

# Define the 

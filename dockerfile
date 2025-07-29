# Node.js 22 Alpine image as the base image for a smaller footprint
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /tech

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose port 5173 for the application
EXPOSE 5173

# Define the default command to run the application
CMD [ "npm", "start"]
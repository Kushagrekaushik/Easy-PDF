# Use an official Node.js runtime as the base image
FROM node:18-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:stable-alpine AS serve

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

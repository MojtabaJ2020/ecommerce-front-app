# Use a lightweight Node.js image to build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package.json and package-lock.json for better caching
COPY package.json package-lock.json ./

# Install dependencies using npm ci for faster, consistent builds
RUN npm ci

# Copy the rest of the application files (but ignore files via .dockerignore)
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the built React app
FROM nginx:alpine

# Copy built React files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
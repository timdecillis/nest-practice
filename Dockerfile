# Use the official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy only package definitions first (for caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the full source code
COPY . .

# Build the NestJS app (compiles TypeScript)
RUN yarn build

# Expose the app's port
EXPOSE 4000

# Start the app using Nest's default script
CMD ["yarn", "start"]

# Build stage (development)
FROM node:alpine AS development
RUN npm install -g nx

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire workspace
COPY . .

# Build the 'auth' app
RUN nx build auth

# Production stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy everything else, except what's in .dockerignore
COPY . .

# Copy the 'auth' app build from the development stage
COPY --from=development /usr/src/app/dist/apps/auth ./dist/apps/auth

CMD ["node", "dist/apps/auth/main"]

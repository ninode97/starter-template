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

# Build the 'portfolio' app
RUN nx build portfolio

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

# Copy the 'portfolio' app build from the development stage
COPY --from=development /usr/src/app/dist/apps/portfolio ./dist/apps/portfolio

CMD ["node", "dist/apps/portfolio/main"]

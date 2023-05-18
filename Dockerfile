# FROM node:18-alpine 
# WORKDIR "/usr/src/app"
# COPY package*.json ./
# RUN npm install --only=prod
# COPY . .
# EXPOSE 10000
# CMD ["node", "index.js"]

FROM node:lts as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/build ./build

EXPOSE 10000
CMD [ "node", "build/index.js" ]
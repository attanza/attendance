FROM node:18-alpine 
WORKDIR "/usr/src/app"
COPY package*.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 10000
CMD ["node", "index.js"]

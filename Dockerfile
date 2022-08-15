FROM node:14

WORKDIR /staff-scheduling-system
COPY package.json .
RUN npm install
COPY . .
CMD node index.js

FROM node:19.6.0
WORKDIR /usr/code
COPY package.json .
RUN npm install
RUN npm install ts-node typescript
COPY . .
ENV SERVER_PORT 4000
EXPOSE $SERVER_PORT
CMD ["npm", "run", "start:prod"]
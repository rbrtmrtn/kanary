FROM node:16
# TODO shouldn't this be /srv or something like that? find best practice
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

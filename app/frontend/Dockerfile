FROM node:16.18.1

WORKDIR /usr/app-frontend

COPY package* ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]



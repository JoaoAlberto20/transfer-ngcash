FROM node:16.18.1

WORKDIR /usr/app-backend

COPY package* ./

RUN npm install

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]

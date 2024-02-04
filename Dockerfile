FROM node:lts-hydrogen

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

FROM mhart/alpine-node:10

WORKDIR /api

COPY package.json /api/

RUN npm install

RUN npm install -g nodemon

COPY . /api/

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
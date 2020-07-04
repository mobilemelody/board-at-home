FROM mhart/alpine-node:14.5

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 8080

CMD ["npm", "run", "start"]
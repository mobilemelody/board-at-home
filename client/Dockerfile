FROM mhart/alpine-node:10

WORKDIR /client

COPY package.json /client/

RUN yarn

COPY . /client/

EXPOSE 8080

CMD ["yarn", "start"]
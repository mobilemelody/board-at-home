FROM mhart/alpine-node:14.5 AS front-end

RUN mkdir -p /web/

WORKDIR /web/

COPY client /web/client

WORKDIR /web/client

RUN yarn

RUN yarn run build

FROM mhart/alpine-node:14.5

WORKDIR /web/api

COPY api .

COPY --from=front-end /web/client/build ./public

RUN npm install

CMD ["npm", "run", "start"]
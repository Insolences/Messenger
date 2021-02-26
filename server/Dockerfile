FROM node:12

RUN mkdir -p /app
WORKDIR /app

COPY wait-for-it.sh /app
COPY package.json /app

COPY . /app

RUN npm install
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD npm start

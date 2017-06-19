FROM node:6.9

MAINTAINER nicolexyn

LABEL "version"="1.0.0"

RUN apt-get update

RUN npm install --global node-gyp gulp-cli

RUN mkdir -p /usr/src/app

COPY ./app /usr/src/app/

WORKDIR /usr/src/app

RUN rm -rf node_modules/

RUN npm install

EXPOSE 8080

CMD [ "gulp", "serve:dist" ]
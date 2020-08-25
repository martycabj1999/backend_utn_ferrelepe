FROM node:12

WORKDIR /appuser/app

COPY . /appuser/app

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]

FROM node:18

COPY package*.json ./
COPY yarn.lock ./

RUN npm install yarn
RUN yarn install

COPY . /

EXPOSE 3001

CMD ["npm", "start"]
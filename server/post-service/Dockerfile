 
FROM node:20-alpine


RUN npm i -g nodemon
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run","dev"]

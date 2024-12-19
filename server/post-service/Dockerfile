 
FROM node:20-alpine
ENV MONGO_URI=mongodb+srv://hishammpsn:y7SIwtwzl8kZXqPu@cluster0.euxsp.mongodb.net/post_db?retryWrites=true&w=majority
ENV PORT=5001
ENV SECRET=secret

RUN npm i -g nodemon
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run","dev"]

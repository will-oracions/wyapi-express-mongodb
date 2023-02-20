FROM node:19-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src:/app/src
EXPOSE 43000
CMD [ "node", "src/index" ]
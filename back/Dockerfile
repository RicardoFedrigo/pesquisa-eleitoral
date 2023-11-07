FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER node

ENV PORT=3000
ENV NODE_ENV=production

FROM node:18-alpine As production

EXPOSE 3000

CMD ["npm", "dist/main.js"]
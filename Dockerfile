
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm i --save-dev @types/node
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]




FROM node:20-slim

RUN apt-get update && apt-get install -y git && apt-get clean

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
RUN npm install --dev @types/react

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
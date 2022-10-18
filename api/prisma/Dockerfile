FROM node:18
WORKDIR /prisma
RUN npm i -g prisma@4.4
COPY ./ ./
CMD ["prisma", "migrate", "deploy"]
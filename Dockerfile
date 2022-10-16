FROM node:16 AS builder
WORKDIR /app
COPY package*.json  ./
COPY tsconfig.json  ./
RUN npm ci
COPY prisma ./prisma
RUN npm run generate
COPY src ./src
RUN npm run build

FROM gcr.io/distroless/nodejs:16
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
WORKDIR /app
EXPOSE 3000
CMD ["main.js"]
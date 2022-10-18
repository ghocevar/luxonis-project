FROM node:18 AS builder
WORKDIR /app
COPY package*.json  ./
COPY tsconfig.json  ./
RUN npm ci
COPY prisma ./prisma
RUN npm run prisma:generate
COPY src ./src
RUN npm run build

RUN npm ci --omit dev

FROM node:18
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules
CMD ["main.js"]
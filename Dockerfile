# FROM node:16 AS builder
# WORKDIR /app
# COPY package*.json  ./
# COPY tsconfig.json  ./
# RUN npm ci
# COPY src ./src
# RUN npm run build

# FROM node:16 AS modules
# WORKDIR /app
# COPY package*.json  ./
# RUN npm ci --omit dev
# COPY prisma ./prisma
# RUN npm run generate

# FROM node:16-alpine
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/dist ./
# COPY --from=modules /app/node_modules ./node_modules
# CMD ["main.js"]

FROM node:16 AS builder
WORKDIR /app
COPY package*.json  ./
COPY tsconfig.json  ./
RUN npm ci
COPY src ./src
RUN npm run build

RUN npm ci --omit dev
COPY prisma ./prisma
RUN npm run generate

FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules
CMD ["main.js"]
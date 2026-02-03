FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
# Install full deps to allow TypeScript build
RUN npm install
COPY . .
# Build TypeScript to `dist`
RUN npm run build || true
RUN npm prune --production

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 8081
CMD ["node", "dist/index.js"]

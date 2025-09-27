# Base image (builder)
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (cache-friendly)
COPY package*.json ./
RUN npm ci

# Copy source and build TypeScript
COPY . .
RUN npm run build

# Runtime image (production-only)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled dist
COPY --from=builder /app/dist ./dist

# Run as non-root
USER node

# App port (platforms can remap host port)
EXPOSE 3000

# Start the server
CMD ["node", "dist/api/server.js"]

FROM oven/bun:slim AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /build
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /build
ENV NODE_ENV=production
COPY --from=deps /build/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /server
ENV NODE_ENV=production
COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/.next/static ./.next/static
COPY --from=builder /build/public ./public

EXPOSE 3000
CMD ["bun", "run", "server.js"]

FROM oven/bun:1.1.17-alpine AS base

FROM base AS deps

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production


COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static


USER bun

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME=0.0.0.0 bun run server.js
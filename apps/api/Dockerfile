ARG NODE_VERSION=20

# ---------- BASE ----------
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# ---------- PRUNE ----------
FROM base AS prune
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune api --docker

# ---------- PROD DEPS ----------
FROM base AS prod-deps
WORKDIR /app
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod

# ---------- BUILD ----------
FROM base AS build
WORKDIR /app
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=prune /app/out/full/ ./
RUN SKIP_ENV_VALIDATION=true pnpm exec turbo build

# ---------- PROD ----------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs
COPY --from=prod-deps /app ./
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages ./packages
USER nestjs
EXPOSE 3001
CMD ["node", "apps/api/dist/main.js"]
ARG NODE_VERSION=20

# ---------- BASE ----------
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
RUN corepack enable

# ---------- PRUNE ----------
FROM base AS prune
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune web --docker

# ---------- BUILD ----------
FROM base AS build
WORKDIR /app
COPY --from=prune /app/out/json/ ./
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile
COPY --from=prune /app/out/full/ ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN SKIP_ENV_VALIDATION=true pnpm exec turbo build --filter=web...

# ---------- PROD ----------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs
COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public
COPY --from=build /app/packages ./packages
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "apps/web/server.js"]
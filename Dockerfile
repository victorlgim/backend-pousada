
############################
# 1) Base com pnpm instalado
############################
FROM node:20-alpine AS base
WORKDIR /app

# Instala pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

############################
# 2) Instala dependências (com dev)
############################
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

############################
# 3) Build TypeScript -> JavaScript
############################
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig*.json ./
COPY src ./src
RUN pnpm run build

############################
# 4) Runtime de produção
############################
FROM base AS runtime
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 5000

# Healthcheck
RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1


CMD ["node", "dist/server.js"]

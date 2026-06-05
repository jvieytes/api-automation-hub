FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY api/package.json ./api/package.json

RUN pnpm install --filter @portfolio/api --prod --frozen-lockfile

COPY api ./api

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

WORKDIR /app/api
CMD ["pnpm", "start"]

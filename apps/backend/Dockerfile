# Build: compiling needs every dependency (Nest CLI, TypeScript, Prisma CLI).
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json yarn.lock prisma.config.ts ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Runtime: the compiled app and node_modules, which also carry the Prisma CLI for migrations.
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/prisma.config.ts ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 4000
# Pending migrations are applied before start; quiz releases are published by the app on boot.
CMD ["sh", "-c", "yarn db:deploy && yarn start:prod"]

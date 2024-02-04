# Global options
FROM node:lts-hydrogen as base
WORKDIR /app
EXPOSE 3000
# Global options

# Production options
FROM base as prod
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev
COPY . .
CMD [ "npm", "run", "start"]
# Production options

# Develop options
FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --include=dev
COPY . .
CMD [ "npm", "run", "dev" ]
# Develop options

# Tests options(not working yet)
FROM base as test
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --include=dev
COPY . .
RUN npm run test
# Tests options

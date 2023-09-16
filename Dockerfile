# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION} as base

# Bun app lives here
WORKDIR /app

# Install packages needed to build node modules
# RUN apt-get update -qq && \
#   apt-get install -y python-is-python3 pkg-config build-essential 

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci

# Copy application code
COPY --link . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "src/index.tsx" ]

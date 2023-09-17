ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION} as base

#? Copy nginx config
COPY ./nginx.conf /etc/nginx/sites-enabled/bethlab.conf

#? Bun app lives here
WORKDIR /app

#? Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci
#? Copy application code
COPY --link . .

#? Start the server
EXPOSE 3000
CMD [ "bun", "start" ]

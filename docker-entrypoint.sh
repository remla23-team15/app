#!/usr/bin/env sh
set -eu

envsubst '${MY_APP_URL} ${BACKEND_HOST}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"

#!/usr/bin/env sh
set -eu

envsubst '${MY_APP_URL} ${MY_APP_FEEDBACK} ${BACKEND_HOST}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

exec "$@"

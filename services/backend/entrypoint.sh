#!/bin/bash

echo "Waiting for postgres..."

while ! nc -z db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

if [ $ENVIRONMENT = prod  ]
then
gunicorn --bind 0.0.0.0:8004 -w 4 -k uvicorn.workers.UvicornWorker app.main:app
else
uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8004
fi

exec "$@"
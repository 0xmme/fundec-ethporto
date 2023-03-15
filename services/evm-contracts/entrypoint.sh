#!/bin/sh

npm run start:local &

# Check if the ENVIRONMENT variable is set to "dev"
if [ "$ENVIRONMENT" = "dev" ]; then
  # Wait for the Hardhat node to be ready before deploying the contracts
  echo "Waiting for Hardhat node to be ready..."

  while ! curl -s http://localhost:8545 >/dev/null; do
    sleep 0.1
  done

  echo "Hardhat node started"

  npm run deploy:local
fi

# Keep the script running indefinitely
while true; do
  sleep 1000
done
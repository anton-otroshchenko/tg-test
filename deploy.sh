#!/bin/sh
yarn build || { echo 'build failed' ; exit 1; }
aws --profile habit s3 sync build s3://habits-tracker-frontend/
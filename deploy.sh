#!/bin/bash

mkdir lambda-layer

cp package*.json lambda-layer

cd ./lambda-layer

npm i --production

cd ..

cp -r node_modules/.prisma lambda-layer/node_modules
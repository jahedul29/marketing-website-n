#!/bin/bash

set -e -o pipefail

ENV="${NODE_ENV_OVERRIDE:-$NODE_ENV}"
echo "Build for env $ENV"

# Setup url filters before build
npm run url-filters:build

if [[ $BUILD_DOCS = "1" ]] ; then
	echo "Building docs"
	npm run docs || true
fi

# actually build the site
echo "Building the site"
npm run sync
npm run build

#!/bin/bash

set -e -o pipefail

# Get our template
TEMPLATE=$(cat .vercel.json)

if [ -f "redirects.json" ]; then
	# Get our redirects
	REDIRECTS=$(sed -e '2,$!d' -e '$d' < redirects.json)
else
	# If we don't have a redirects file, use an empty array
	REDIRECTS='"redirects": []'
fi

# Replace the redirects in the template
echo "${TEMPLATE//\"redirects\": \[\]/$REDIRECTS}" > vercel.json

# Format json
npm run format:file vercel.json > /dev/null

# Add to git
git add vercel.json

echo "🌟 Vercel file created!"

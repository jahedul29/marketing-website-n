#!/bin/bash

set -e -o pipefail

if [[ $VERCEL_GIT_COMMIT_REF =~ "clickup-" ]] ; then
  echo ">> Skipping deploy!"
  exit 0;
fi

echo ">> Proceeding with deploy if there is a git diff."
git diff --quiet HEAD^ HEAD \
	./src ./tailwind ./static ./system \
	./script/vercel-* \
	./package* ./*.config.js ./vercel.json* ./.env*

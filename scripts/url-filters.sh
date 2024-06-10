#!/bin/bash

set -e -o pipefail

# This script will configure the git filter tool (if not a build)
# and force the url smudge to happen now

if [ "$1" == "--unset" ]; then
	git config --local --unset filter.url.smudge
	git config --local --unset filter.url.clean
	echo "git filters removed successfully."
	exit;
fi

if [ "$1" != "--build" ]; then
	git config --local filter.url.smudge ./scripts/url-smudge.mjs
	git config --local filter.url.clean ./scripts/url-clean.mjs
	echo "git filters applied successfully."
fi

NODE="$(which node)"
SRC=".env.* codegen.ts package.json"
for F in $SRC; do
	{
		"$NODE" --no-warnings ./scripts/url-smudge.mjs < "$F"
	} > "$F.tmp"
	mv "$F.tmp" "$F"
done;

echo "git smudge applied successfully."

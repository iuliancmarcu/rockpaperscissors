#!/bin/bash
set -e

old_version="$(git describe --tags --abbrev=0)"
regex="^v([0-9]+)$"

if [[ $old_version =~ $regex ]]
then
	new_version="v$((BASH_REMATCH[1]+1))"
else
	new_version="v1"
fi

git tag -a $new_version -m "$new_version"
git push origin $new_version

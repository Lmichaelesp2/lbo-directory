#!/bin/bash
cd "/Users/michaelespinoza/Documents/Claude/Projects/Organization management APP/lbo-directory"
git add -A
git commit -m "${1:-updates}"
git pull --rebase
git push
echo "✅ Org site pushed successfully"

#!/bin/bash
cd "/Users/michaelespinoza/Documents/Claude/Projects/Organization management APP/lbo-directory"
git add -A
git pull --rebase
git commit -m "${1:-updates}"
git push
echo "✅ Org site pushed successfully"

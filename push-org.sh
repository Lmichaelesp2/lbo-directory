#!/bin/bash
cd "/Users/michaelespinoza/Documents/Claude/Projects/Organization management APP/lbo-directory"

# Clear stale git locks left behind by sandbox tooling (index.lock, HEAD.lock, ref locks)
find .git -name "*.lock" -delete 2>/dev/null

git add -A
git commit -m "${1:-updates}"
git pull --rebase
if git push; then
  echo "✅ Org site pushed successfully"
else
  echo "❌ Push FAILED — see errors above"
  exit 1
fi

#!/bin/sh

echo "Running pre-merge script..."

echo "***** RUNNING UNIT TESTS *****"
npm run test:unit -- run || return 1

echo "***** RUNNING LINTER *****"
npm run lint || return 1

echo "***** RUNNING CHECK *****"
npm run check || return 1

npm run build || return 1

echo "*** Finished tests for $dir ***"

echo "Pre-merge checks completed."


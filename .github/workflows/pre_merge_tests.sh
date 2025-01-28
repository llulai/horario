#!/bin/sh

echo "Running pre-merge script..."

echo "***** RUNNING UNIT TESTS *****"
npm run test:unit -- run || exit 1

echo "***** RUNNING LINTER *****"
npm run lint || exit 1

echo "***** RUNNING CHECK *****"
npm run check || exit 1

npm run build || exit 1

echo "*** Finished tests for $dir ***"

echo "Pre-merge checks completed."


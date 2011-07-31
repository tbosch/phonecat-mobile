#! /bin/sh
# build script for the web part of the application
# Combines all JavaScript code and optimizes it.
# Also minimizes CSS files
# Takes one parameter: either "test" or "prod"
# Result of the build process is in the build directory.

MODE=$1

rm -fr tmp/*
rm -fr build/*
cp -r src/main/webapp/ tmp/
if [ "$MODE" = "test" ]
  then cp -r src/test/webapp/ tmp/
fi

if [ "$MODE" = "test" ]
  then node r.js -o build-web.test.js;
  else node r.js -o build-web.prod.js;
fi

rm -fr tmp/*
find build -name "*.js" ! -name 'main*.js' ! -name 'require.js' -exec rm "{}" ";"


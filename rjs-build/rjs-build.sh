#! /bin/sh
# build script for the web part of the application
# Combines all JavaScript code and optimizes it.
# Also minimizes CSS files
# Takes one parameter: either "test" or "prod"
# Result of the build process is in the build directory.

OPTIMIZE=$1
SRC_MAIN=../src/main/webapp
SRC_TEST=../src/test/webapp
IN=../target/requirejs/input
OUT=../target/requirejs/output

mkdir -p $IN
mkdir -p $OUT
rm -fr $IN/*
rm -fr $OUT/*
cp -r $SRC_MAIN/ $IN
cp -r $SRC_TEST/ $IN

# only use java for google closure optimization, as it is slower!
if [ "$OPTIMIZE" = "closure" ]
  then java -classpath js.jar:compiler.jar org.mozilla.javascript.tools.shell.Main r.js -o rjs-build.cfg.js optimize=$OPTIMIZE
  else node r.js -o rjs-build.cfg.js optimize=$OPTIMIZE
fi  
rm -fr $IN


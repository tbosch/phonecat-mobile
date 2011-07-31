#! /bin/sh
# build script for the web part of the application
# Combines all JavaScript code and optimizes it.
# Also minimizes CSS files
# Takes one parameter: either "test" or "prod"
# Result of the build process is in the build directory.

OPTIMIZE=$1
IN=target/requirejs/input
OUT=target/requirejs/output

mkdir -p $IN
mkdir -p $OUT
rm -fr $IN/*
rm -fr $OUT/*
cp -r src/main/webapp/ $IN
cp -r src/test/webapp/ $IN

node r.js -o build-web.cfg.js optimize=$OPTIMIZE
rm -fr $IN


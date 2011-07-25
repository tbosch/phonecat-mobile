rm -fr /tmp/gh-pages
mkdir /tmp/gh-pages
cp -r src/main/webapp/ /tmp/gh-pages
cp -r src/test/webapp/ /tmp/gh-pages
git checkout gh-pages
rm -fr *
cp -r /tmp/gh-pages .


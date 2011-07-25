rm -fr /tmp/gh-pages
mkdir /tmp/gh-pages
cp -r src/main/webapp/ /tmp/gh-pages
cp -r src/test/webapp/ /tmp/gh-pages
if git checkout gh-pages; then
  rm -fr *
  cp -r /tmp/gh-pages/ .
  git add .
  # git commit -m "updated pages"
  git checkout master
fi


# Build script to update the branch gh-pages, which
# contains the live copy of the demo.
if $M2_HOME/bin/mvn package; then
    if git checkout gh-pages; then
      rm -fr *
      cp -r target/requirejs/output/ .
      git add .
      git commit -m "updated pages"
      git checkout master
    fi
fi


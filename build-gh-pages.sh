# Build script to update the branch gh-pages, which
# contains the live copy of the demo.
TMP=/tmp/gh-pages
SRC=target/requirejs/output
if $M2_HOME/bin/mvn package; then
    mkdir $TMP
    rmdir -fr $TMP
    cp -r $SRC/ $TMP
	find $TMP -name "*.js" ! -name "main*.js" ! -name "require.js" -exec rm "{}" ";"    
    if git checkout gh-pages; then
      rm -fr *
      cp -r $TMP/ .
      rmdir -fr $TMP
      #git add .
      #git commit -m "updated pages"
      #git checkout master
    fi
fi


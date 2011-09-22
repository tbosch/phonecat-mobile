/**
 * Plugin for require js to access the factories
 * of the modules. Needed for unit-testing...
 */
define(function() {
    var factories = [];

    function interceptModuleExecuteCallback() {
        var oldExecCb = require.execCb;
        require.execCb = function(fullname, callback) {
            factories[fullname] = callback;
            return oldExecCb.apply(this, arguments);
        }
    }

    function createBrowserPlugin() {
        interceptModuleExecuteCallback();

        function load(name, req, localLoad, config) {
            req([name], function (value) {
                localLoad(factories[name]);
            });
        }

        return {
            load: load
        }
    }

    function extractFactoryFunctionFromModule(moduleText) {
        var factoryRegex = /function[\s\S]*\}/;
        var match = factoryRegex.exec(moduleText);
        if (match) {
            return match[0];
        }
        return null;
    }


    function createBuildPlugin(env) {
        var readFile;
        if (env === 'rhino') {
            readFile = readFileWithRhino;
        } else {
            readFile = readFileWithNodeJs;
        }

        function load(name, req, localLoad, config) {
            var url = req.toUrl(name);
            var text = readFile(url);
            factories[name] = extractFactoryFunctionFromModule(text);
            localLoad();
        }

        function write(pluginName, moduleName, localWrite) {
            var factory = factories[moduleName];
            localWrite("define('" + pluginName + "!" + moduleName + "',function() { return " + factory + "});");
        }

        return {
            load: load,
            write: write
        }

    }

    function readFileWithNodeJs(url) {
        //Using special require.nodeRequire, something added by r.js.
        var fs = require.nodeRequire('fs');
        return fs.readFileSync(url, 'utf8');
    }

    function readFileWithRhino(url) {
        var encoding = "utf-8",
            file = new java.io.File(url),
            lineSeparator = java.lang.System.getProperty("line.separator"),
            input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
            stringBuffer, line,
            content = '';
        try {
            stringBuffer = new java.lang.StringBuffer();
            line = input.readLine();

            // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
            // http://www.unicode.org/faq/utf_bom.html

            // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
            // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
            if (line && line.length() && line.charAt(0) === 0xfeff) {
                // Eat the BOM, since we've already found the encoding on this file,
                // and we plan to concatenating this buffer with others; the BOM should
                // only appear at the top of a file.
                line = line.substring(1);
            }

            stringBuffer.append(line);

            while ((line = input.readLine()) !== null) {
                stringBuffer.append(lineSeparator);
                stringBuffer.append(line);
            }
            //Make sure we return a JavaScript string and not a Java string.
            content = String(stringBuffer.toString()); //String
        } finally {
            input.close();
        }
        return content;
    }

    function getEnvironment() {
        if (typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node) {
            return 'node';
        }
        if (typeof window !== "undefined" && window.navigator && window.document) {
            return 'browser';
        }
        if (typeof Packages !== 'undefined') {
            return 'rhino';
        }
        return 'undefined';
    }

    var env = getEnvironment();
    if (env==='browser') {
        return createBrowserPlugin();
    } else {
        return createBuildPlugin(env);
    }
});

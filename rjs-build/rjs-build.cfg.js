({
    appDir: "../target/requirejs/input",
    baseUrl: ".",
    dir: "../target/requirejs/output",
	closure: {
        CompilerOptions: {},
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS',
        loggingLevel: 'WARNING'
    },
    modules: [
        {
            name: "main"
        },
        {
            name: "main-unit-html"
        },
        {
            name: "main-unit-jstd"
        },
        {
            name: "main-ui-html"
        },
        {
            name: "main-ui-jstd"
        }
    ]
})
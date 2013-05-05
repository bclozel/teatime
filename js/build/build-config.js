({
    appDir: "../..",
    baseUrl: "js",
    dir: "../../target",

    optimizeCss: "standard.keepLines",
    mainConfigFile: "../main.js",

    inlineText: true,
    removeCombined: true,
    fileExclusionRegExp: /^build/,

    modules: [
        {
            name: "main"
        }
    ]
})
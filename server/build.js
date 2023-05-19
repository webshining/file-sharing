const { build } = require('esbuild')
const { dependencies, devDependencies } = require('./package.json')

build({
    entryPoints: ['./src/index.js'],
    bundle: true,
    minify: true,
    outfile: "dist/bundle.js",
    sourcemap: true,
    platform: "node",
    format: "cjs",
    external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
})
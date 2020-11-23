let { name } = require('./package.json')
const vue = require('rollup-plugin-vue')
const { terser } = require('rollup-plugin-terser')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonJs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const license = require('rollup-plugin-license')
const postcss = require('rollup-plugin-postcss')
const _ = require('lodash')

name = name.replace('@awema-pl/', '')
const namePascal = _.upperFirst(_.camelCase('content-window'))

const external = ['vue', 'vue-router']

const baseConfig = {
    input: './resources/js/plugin.js',
    plugins: {
        preVue: [
            commonJs({
                include: 'node_modules/**'
            }),
            nodeResolve({
                mainFields: ['module', 'main', 'jsnext:main']
            }),
        ],
        vue: {
            css: false,
            template: {
                isProduction: true,
            },
        },
        postVue: [
            license({
                banner: "Bundle of AWEMA <%= pkg.name %> \n Generated: <%= moment().format('YYYY-MM-DD HH:mm:ss') %> \n Version: <%= pkg.version %>"
            })
        ],
    },
}


module.exports = [

    // ESM
    {
        ...baseConfig,
        output: {
            file: `dist/js/${name}.esm.js`,
            format: 'esm',
            exports: 'named'
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            terser({
                output: {
                    ecma: 6,
                },
            })
        ]
    },

    // UMD
    {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: `dist/js/${name}.ssr.js`,
            format: 'cjs',
            name: namePascal,
            exports: 'named'
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            vue({
                ...baseConfig.plugins.vue,
                template: {
                    ...baseConfig.plugins.vue.template,
                    optimizeSSR: true,
                },
            }),
            babel(),
            ...baseConfig.plugins.postVue
        ],
    },

    // IIFE
    {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: `dist/js/${name}.min.js`,
            format: 'iife',
            name: namePascal,
            exports: 'named'
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel(),
            terser({
                output: {
                    ecma: 5,
                },
            }),
        ],
    }
]

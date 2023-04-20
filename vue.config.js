const path = require("path");

const UnusedFilesPlugin = require('unused-files-webpack-plugin').default;
const ImageminPlugin = require('imagemin-webpack-plugin').default
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let d = new Date();
let month = d.getMonth() < 10 ? '0' + (parseInt(d.getMonth()) + 1) : parseInt(d.getMonth()) + 1;
let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
let name_folder = d.getFullYear() + '-' + month + '-' + day + '-' + process.env.VUE_APP_MODE;
let outputFolder = 'dev'
if (process.env.VUE_APP_MODE == 'production') {
    outputFolder = `./production/${name_folder}`
} else if (process.env.VUE_APP_MODE == 'staging') {
    outputFolder = `./staging/${name_folder}`
} else {
    outputFolder = `./dev/${name_folder}`
}
module.exports = {
    outputDir: path.resolve(__dirname, outputFolder),
    runtimeCompiler: true,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'kh',
            localeDir: 'locales',
            enableInSFC: false
        },
    },
    // filenameHashing: false,
    css: {
        extract: {ignoreOrder: true},
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/scss/_font.scss";`
            }
        },
    },
    chainWebpack: config => {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')

        const svgRule = config.module.rule('svg')

        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        svgRule.uses.clear()

        // add replacement loader(s)
        svgRule
            .test(/\.(svg)$/)
            .use('html-loader')
            .loader('html-loader')
            .options({
                attrs: ['div:v-html']
            })
    },
    configureWebpack: {
        performance: {
            hints: false
        },
        optimization: {
            usedExports: true,
            // minimize: true,
            // minimizer: [
            //     new UglifyJsPlugin({
            //         uglifyOptions: {
            //             compress: {
            //                 drop_console: true
            //             },
            //         }
            //     })
            // ],
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        },
        plugins: [
            new UnusedFilesPlugin({
                failOnUnused: process.env.VUE_APP_MODE === 'production',
                patterns: ['src/*.js']
            }),
            // new GenerateSW(),
            new ImageminPlugin({
                disable: process.env.VUE_APP_MODE !== 'production', // Disable during development
                pngquant: {
                    quality: '95-100'
                }
            })
        ]
    },
    "transpileDependencies": [
        "vuetify"
    ]
}
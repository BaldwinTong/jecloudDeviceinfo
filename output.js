{
  mode: 'development',
  context: 'E:\\workspace\\jecloud\\jecloud-cli',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'E:\\workspace\\jecloud\\jecloud-cli\\dist',
    filename: 'js/[name].js',
    publicPath: '/micro/cli/',
    chunkFilename: 'js/[name].js',
    library: 'jecloud-cli-[name]',
    libraryTarget: 'umd',
    jsonpFunction: 'webpackJsonp_jecloud-cli'
  },
  resolve: {
    alias: {
      '@': 'E:\\workspace\\jecloud\\jecloud-cli\\src',
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      '@micro': 'E:\\workspace\\jecloud\\jecloud-cli\\service\\micro',
      '@admin': 'E:\\workspace\\jecloud\\jecloud-cli\\service\\admin',
      '@common': 'E:\\workspace\\jecloud\\jecloud-cli\\service\\common',
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      vue: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\vue'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'E:\\workspace\\jecloud\\jecloud-cli\\node_modules',
      'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+@vue+cli-service@4.5.15_01f8afebc137ed4c69a387d0457c89c0\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        },
        makePlugin: function () { /* omitted long function */ },
        moduleLoader: function () { /* omitted long function */ },
        topLevelLoader: {
          apply: function nothing() {
            // ¯\_(ツ)_/¯
          }
        },
        bind: function () { /* omitted long function */ },
        tsLoaderOptions: function () { /* omitted long function */ },
        forkTsCheckerOptions: function () { /* omitted long function */ }
      }
    ]
  },
  resolveLoader: {
    modules: [
      'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+@vue+cli-plugin-babel@4.5.15_918b99db821daab90cc6b6be27585fa2\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'E:\\workspace\\jecloud\\jecloud-cli\\node_modules',
      'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+@vue+cli-service@4.5.15_01f8afebc137ed4c69a387d0457c89c0\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      {
        apply: function nothing() {
          // ¯\_(ツ)_/¯
        }
      }
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('mjs') */
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        include: [
          /node_modules/
        ]
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+cache-loader@4.1.0_webpack@4.46.0\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '1f7763dc'
            }
          },
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-loader@16.8.3_webpack@4.46.0\\node_modules\\vue-loader\\dist\\index.js',
            options: {
              cacheDirectory: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '1f7763dc',
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+url-loader@2.3.0_file-loader@4.3.0+webpack@4.46.0\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+file-loader@4.3.0_webpack@4.46.0\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+file-loader@4.3.0_webpack@4.46.0\\node_modules\\file-loader\\dist\\cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+url-loader@2.3.0_file-loader@4.3.0+webpack@4.46.0\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+file-loader@4.3.0_webpack@4.46.0\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+url-loader@2.3.0_file-loader@4.3.0+webpack@4.46.0\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+file-loader@4.3.0_webpack@4.46.0\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'raw-loader'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+less-loader@5.0.0_less@3.13.1+webpack@4.46.0\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  paths: [
                    'E:\\workspace\\jecloud\\jecloud-cli\\node_modules'
                  ],
                  javascriptEnabled: true,
                  modifyVars: {
                    hack: 'true; @import "E:\\workspace\\jecloud\\jecloud-cli\\service\\common\\assets\\styles\\theme-debug.less";'
                  }
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+less-loader@5.0.0_less@3.13.1+webpack@4.46.0\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  paths: [
                    'E:\\workspace\\jecloud\\jecloud-cli\\node_modules'
                  ],
                  javascriptEnabled: true,
                  modifyVars: {
                    hack: 'true; @import "E:\\workspace\\jecloud\\jecloud-cli\\service\\common\\assets\\styles\\theme-debug.less";'
                  }
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+less-loader@5.0.0_less@3.13.1+webpack@4.46.0\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  paths: [
                    'E:\\workspace\\jecloud\\jecloud-cli\\node_modules'
                  ],
                  javascriptEnabled: true,
                  modifyVars: {
                    hack: 'true; @import "E:\\workspace\\jecloud\\jecloud-cli\\service\\common\\assets\\styles\\theme-debug.less";'
                  }
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+less-loader@5.0.0_less@3.13.1+webpack@4.46.0\\node_modules\\less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  paths: [
                    'E:\\workspace\\jecloud\\jecloud-cli\\node_modules'
                  ],
                  javascriptEnabled: true,
                  modifyVars: {
                    hack: 'true; @import "E:\\workspace\\jecloud\\jecloud-cli\\service\\common\\assets\\styles\\theme-debug.less";'
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+css-loader@3.6.0_webpack@4.46.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+postcss-loader@3.0.0\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+cache-loader@4.1.0_webpack@4.46.0\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '66d36369'
            }
          },
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+babel-loader@8.2.3_a58183228c2c7b1a132de84b2b6f9adf\\node_modules\\babel-loader\\lib\\index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+@vue+cli-service@4.5.15_01f8afebc137ed4c69a387d0457c89c0\\node_modules\\@vue\\cli-service\\lib'
        ],
        use: [
          {
            loader: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+eslint-loader@2.2.1_eslint@7.32.0+webpack@4.46.0\\node_modules\\eslint-loader\\index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '42b754a4',
              emitWarning: false,
              emitError: false,
              eslintPath: 'E:\\workspace\\jecloud\\jecloud-cli\\node_modules\\.pnpm\\registry.npmmirror.com+eslint@7.32.0\\node_modules\\eslint',
              formatter: undefined
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            output: {
              comments: /^\**!|@preserve|@license|@cc_on/i
            },
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('feature-flags') */
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_HTML_ICON: '"fal fa-tools"',
          VUE_APP_HTML_TITLE: '"JECloud 插件项目"',
          VUE_APP_MICRO_CONFIG_ADMIN: '"false"',
          VUE_APP_MICRO_CONFIG_PROXY_VAR: '"VUE_APP_MICRO_PROXY_"',
          VUE_APP_MICRO_CONFIG_ROUTE: '"/micro"',
          VUE_APP_MICRO_SERVICE_CLI: '"//localhost:3000"',
          VUE_APP_MICRO_SERVICE_FUNCTION: '"//localhost:3001"',
          VUE_APP_MICRO_SERVICE_MENU: '"//localhost:3003"',
          VUE_APP_MICRO_SERVICE_TABLE: '"//localhost:3002"',
          VUE_APP_SERVICE_PORT: '"3000"',
          VUE_APP_SERVICE_PROXY: '"http://develop.jecloud.net"',
          VUE_APP_SERVICE_PROXY_PREFIX: '"/jeapi"',
          VUE_APP_THEME_COUNT: '"-1"',
          BASE_URL: '"/micro/cli/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html-index') */
    new HtmlWebpackPlugin(
      {
        title: 'JECloud 插件项目',
        templateParameters: function () { /* omitted long function */ },
        chunks: [
          'chunk-vendors',
          'chunk-common',
          'index'
        ],
        template: 'public/index.html',
        filename: 'index.html'
      }
    ),
    /* config.plugin('preload-index') */
    new PreloadPlugin(
      {
        rel: 'preload',
        includeHtmlNames: [
          'index.html'
        ],
        include: {
          type: 'initial',
          entries: [
            'index'
          ]
        },
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch-index') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        includeHtmlNames: [
          'index.html'
        ],
        include: {
          type: 'asyncChunks',
          entries: [
            'index'
          ]
        }
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'E:\\workspace\\jecloud\\jecloud-cli\\public',
          to: 'E:\\workspace\\jecloud\\jecloud-cli\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    {
      definitions: {
        __CLI_ENVS__: '{"NODE_ENV":"development","VUE_APP_HTML_ICON":"fal fa-tools","VUE_APP_HTML_TITLE":"JECloud 插件项目","VUE_APP_MICRO_CONFIG_ADMIN":false,"VUE_APP_MICRO_CONFIG_PROXY_VAR":"VUE_APP_MICRO_PROXY_","VUE_APP_MICRO_CONFIG_ROUTE":"/micro","VUE_APP_MICRO_SERVICE_CLI":"//localhost:3000","VUE_APP_MICRO_SERVICE_FUNCTION":"//localhost:3001","VUE_APP_MICRO_SERVICE_MENU":"//localhost:3003","VUE_APP_MICRO_SERVICE_TABLE":"//localhost:3002","VUE_APP_SERVICE_PORT":3000,"VUE_APP_SERVICE_PROXY":"http://develop.jecloud.net","VUE_APP_SERVICE_PROXY_PREFIX":"/jeapi","VUE_APP_THEME_COUNT":-1,"PUBLIC_PATH":"/micro/cli/"}'
      }
    },
    {
      options: {
        languages: [
          {
            label: 'typescript',
            entry: [
              'vs/basic-languages/typescript/typescript.contribution',
              'vs/language/typescript/monaco.contribution'
            ],
            worker: {
              id: 'vs/language/typescript/tsWorker',
              entry: 'vs/language/typescript/ts.worker'
            }
          },
          {
            label: 'javascript',
            entry: 'vs/basic-languages/javascript/javascript.contribution'
          },
          {
            label: 'css',
            entry: [
              'vs/basic-languages/css/css.contribution',
              'vs/language/css/monaco.contribution'
            ],
            worker: {
              id: 'vs/language/css/cssWorker',
              entry: 'vs/language/css/css.worker'
            }
          }
        ],
        features: [
          {
            label: 'accessibilityHelp',
            entry: 'vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp'
          },
          {
            label: 'anchorSelect',
            entry: 'vs/editor/contrib/anchorSelect/anchorSelect'
          },
          {
            label: 'bracketMatching',
            entry: 'vs/editor/contrib/bracketMatching/bracketMatching'
          },
          {
            label: 'caretOperations',
            entry: 'vs/editor/contrib/caretOperations/caretOperations'
          },
          {
            label: 'clipboard',
            entry: 'vs/editor/contrib/clipboard/clipboard'
          },
          {
            label: 'codeAction',
            entry: 'vs/editor/contrib/codeAction/codeActionContributions'
          },
          {
            label: 'codelens',
            entry: 'vs/editor/contrib/codelens/codelensController'
          },
          {
            label: 'colorPicker',
            entry: 'vs/editor/contrib/colorPicker/colorContributions'
          },
          {
            label: 'comment',
            entry: 'vs/editor/contrib/comment/comment'
          },
          {
            label: 'contextmenu',
            entry: 'vs/editor/contrib/contextmenu/contextmenu'
          },
          {
            label: 'coreCommands',
            entry: 'vs/editor/browser/controller/coreCommands'
          },
          {
            label: 'cursorUndo',
            entry: 'vs/editor/contrib/cursorUndo/cursorUndo'
          },
          {
            label: 'dnd',
            entry: 'vs/editor/contrib/dnd/dnd'
          },
          {
            label: 'documentSymbols',
            entry: 'vs/editor/contrib/documentSymbols/documentSymbols'
          },
          {
            label: 'find',
            entry: 'vs/editor/contrib/find/findController'
          },
          {
            label: 'folding',
            entry: 'vs/editor/contrib/folding/folding'
          },
          {
            label: 'fontZoom',
            entry: 'vs/editor/contrib/fontZoom/fontZoom'
          },
          {
            label: 'format',
            entry: 'vs/editor/contrib/format/formatActions'
          },
          {
            label: 'gotoError',
            entry: 'vs/editor/contrib/gotoError/gotoError'
          },
          {
            label: 'gotoLine',
            entry: 'vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess'
          },
          {
            label: 'gotoSymbol',
            entry: [
              'vs/editor/contrib/gotoSymbol/goToCommands',
              'vs/editor/contrib/gotoSymbol/link/goToDefinitionAtPosition'
            ]
          },
          {
            label: 'hover',
            entry: 'vs/editor/contrib/hover/hover'
          },
          {
            label: 'iPadShowKeyboard',
            entry: 'vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard'
          },
          {
            label: 'inPlaceReplace',
            entry: 'vs/editor/contrib/inPlaceReplace/inPlaceReplace'
          },
          {
            label: 'indentation',
            entry: 'vs/editor/contrib/indentation/indentation'
          },
          {
            label: 'inlayHints',
            entry: 'vs/editor/contrib/inlayHints/inlayHintsController'
          },
          {
            label: 'inlineCompletions',
            entry: 'vs/editor/contrib/inlineCompletions/ghostTextController'
          },
          {
            label: 'inspectTokens',
            entry: 'vs/editor/standalone/browser/inspectTokens/inspectTokens'
          },
          {
            label: 'linesOperations',
            entry: 'vs/editor/contrib/linesOperations/linesOperations'
          },
          {
            label: 'linkedEditing',
            entry: 'vs/editor/contrib/linkedEditing/linkedEditing'
          },
          {
            label: 'links',
            entry: 'vs/editor/contrib/links/links'
          },
          {
            label: 'multicursor',
            entry: 'vs/editor/contrib/multicursor/multicursor'
          },
          {
            label: 'parameterHints',
            entry: 'vs/editor/contrib/parameterHints/parameterHints'
          },
          {
            label: 'quickCommand',
            entry: 'vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess'
          },
          {
            label: 'quickHelp',
            entry: 'vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess'
          },
          {
            label: 'quickOutline',
            entry: 'vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess'
          },
          {
            label: 'referenceSearch',
            entry: 'vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch'
          },
          {
            label: 'rename',
            entry: 'vs/editor/contrib/rename/rename'
          },
          {
            label: 'smartSelect',
            entry: 'vs/editor/contrib/smartSelect/smartSelect'
          },
          {
            label: 'snippets',
            entry: 'vs/editor/contrib/snippet/snippetController2'
          },
          {
            label: 'suggest',
            entry: 'vs/editor/contrib/suggest/suggestController'
          },
          {
            label: 'toggleHighContrast',
            entry: 'vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast'
          },
          {
            label: 'toggleTabFocusMode',
            entry: 'vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode'
          },
          {
            label: 'transpose',
            entry: 'vs/editor/contrib/caretOperations/transpose'
          },
          {
            label: 'unusualLineTerminators',
            entry: 'vs/editor/contrib/unusualLineTerminators/unusualLineTerminators'
          },
          {
            label: 'viewportSemanticTokens',
            entry: 'vs/editor/contrib/viewportSemanticTokens/viewportSemanticTokens'
          },
          {
            label: 'wordHighlighter',
            entry: 'vs/editor/contrib/wordHighlighter/wordHighlighter'
          },
          {
            label: 'wordOperations',
            entry: 'vs/editor/contrib/wordOperations/wordOperations'
          },
          {
            label: 'wordPartOperations',
            entry: 'vs/editor/contrib/wordPartOperations/wordPartOperations'
          }
        ],
        filename: '[name].worker.js',
        publicPath: '',
        globalAPI: false
      }
    }
  ],
  entry: {
    index: [
      'E:\\workspace\\jecloud\\jecloud-cli\\src\\main.js'
    ]
  },
  externals: {
    vue: 'Vue',
    'vue-i18n': 'VueI18n',
    'vue-router': 'VueRouter',
    'pinyin-pro': 'pinyin',
    sortablejs: 'Sortable',
    dayjs: 'dayjs',
    axios: 'axios',
    'lodash-es': {
      commonjs: 'lodash',
      amd: 'lodash',
      commonjs2: 'lodash',
      root: '_'
    },
    'xe-utils': 'XEUtils'
  }
}

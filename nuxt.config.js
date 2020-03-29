export default {
  mode: 'universal',
  vue: {
		config: {
		  productionTip: false,
		  devtools: false
		}
	},
	vueMeta: {
		debounceWait: 10,
		refreshOnceOnNavigation: true
	},
  /*
   ** Headers of the page
   */
  head: {
    title: 'Declaratia pe raspundere proprie pentru deplasari - declaratie.net',
    meta: [{
        charset: 'utf-8'
      },
      { hid: 'digitap-viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      { hid: 'digitap-description', name: 'description', content: 'Completeaza gratuit declaratia obligatorie pe proprie raspundere, venita in urma ordonantei militare nr. 3'},
      { hid: 'digitap-ogTitle', name: 'og:title', content: 'Declaratia pe raspundere proprie pentru deplasari - declaratie.net'},
      { hid: 'digitap-ogDescription', name: 'og:description', content: 'Completeaza gratuit declaratia obligatorie pe proprie raspundere, venita in urma ordonantei militare nr. 3'},
      { hid: 'digitap-ogImage', name: 'og:image', content: 'https://declaratie.net/share.jpg'},
      { hid: 'digitap-ogHost', name: 'og:host', content: 'https://declaratie.net'},
      { hid: 'digitap-ogUrl', name: 'og:url', content: 'https://declaratie.net'},
      { hid: 'digitap-ogType', name: 'og:type', content: 'website'},
      { hid: 'digitap-author', name: 'author', content: 'Digitap'},
    ],
    link: []
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-portal'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  render: {
    resourceHints: false
  },
  generate: {
    dir: 'docs',
  },
  build: {
    minimize: true,
    splitChunks: {
        layouts: false,
        pages: true,
        commons: true
    },
    extractCSS: true,
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

      config.module.rules.filter(r => r.test.toString().includes('svg')).forEach(r => {
          r.test = /\.(png|jpe?g|gif)$/
      });

      config.module.rules.push({
            test: /\.svg$/,
            oneOf: [{
                    resourceQuery: /inline/,
                    loader: 'vue-svg-loader',
                },
                {
                    loader: 'file-loader',
                    query: {
                        name: `/[ext]/[sha512:hash:base64:7].[ext]`,
                    },
                }
            ],
        });
    }
  }
}

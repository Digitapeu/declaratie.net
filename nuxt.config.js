export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
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
    '@/plugins/element-ui'
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
  build: {
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

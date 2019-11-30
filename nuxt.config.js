
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/<repository-name>/'
  }
} : {}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'height=device-height, width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'bootstrap-vue/nuxt',
    'nuxt-webfontloader',
    ['nuxt-gmaps', {
      key: 'AIzaSyAfksy0yaY_oQczIOX8_QtxmPLe8bILiJo',
    }
      //you can use libraries: ['places']
    ],
    'nuxt-socket-io',
    'nuxt-webfontloader',
    ['nuxt-fontawesome', {
      component: 'fa', 
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        }
      ]
    }]
  ],
  io: {
    sockets: [
      {
        name: 'chat',
        url: 'https://taxzi.herokuapp.com',
        // url: 'http://localhost:9999/',
        transports: ['websocket'],
      },
    ]
  },
  axios: {
    baseUrl: 'https://taxzi.herokuapp.com',
    proxyHeaders: false,
    credentials: false,
  },
  webfontloader: {
    google: {
      families: ['Nunito:400,700'] //Loads Lato font with weights 400 and 700
    }
  },
  routerBase,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

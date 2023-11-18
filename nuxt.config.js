export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'RFCShift2023',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  publicRuntimeConfig: {
    serverUrl: process.env.SERVER_URL
  },
  router: {
      base: '/Shift2023/',
      trailingSlash: true,
      extendRoutes(routes) {
        routes.push(
          { path: '/log', redirect: '/log/' },
        )
      },
    middleware: ['auth']
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/styles/style.scss' },
    { src: '~/assets/styles/reset.scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources',
  ],
  styleResources: {
    scss:['./assets/styles/styleResources/variables.scss',
]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.SERVER_URL,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  components:  [
    '~/components'
  ],
}

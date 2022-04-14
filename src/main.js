import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'

import translations from './translations'

const i18n = createI18n({
  locale: 'es', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: translations, // set locale messages,
})

const app = createApp(App)

app.use(i18n)

app.use(router)

app.use(createPinia())

app.mount('#app')

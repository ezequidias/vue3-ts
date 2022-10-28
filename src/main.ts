/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import axios from '@/plugins/axios'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

loadFonts()

const app = createApp(App)

app.use(Toast);
app.use(vuetify)
app.use(axios)
app.use(createPinia().use(({app, store}) => {store.$axios = axios.install(app)}))
app.use(router)

app.mount('#app')

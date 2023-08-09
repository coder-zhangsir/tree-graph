import './assets/css/common.css'
import { createApp } from 'vue'
import App from './App.vue'
import vue3TreeOrg from 'vue3-tree-org'
import "vue3-tree-org/lib/vue3-tree-org.css"
import './assets/iconfont/iconfont'
import './assets/profiles/global.axios.config'

const app = createApp(App)
app.use(vue3TreeOrg)
app.mount('#app')

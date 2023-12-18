import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import naive from 'naive-ui'

const app = createApp(App);
app.use(ArcoVue)
app.use(ArcoVueIcon);
app.use(naive)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import ZkTable from 'vue-table-with-tree-grid'

// 引入axios包
import axios from 'axios'

// 设置axios的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 设置拦截器
axios.interceptors.request.use(config => {
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 固定写法（在最后必须return config）
    return config
})
const app = createApp(App)

installElementPlus(app)
    // 将axios挂载到Vue实例上
app.config.globalProperties.$http = axios
app.use(ZkTable)
app.use(router).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'


import axios from 'axios'
// 设置axios的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 将axios挂载到Vue实例上


var app = createApp(App)
app.use(router)
app.mount('#app')
app.use(ElementPlus)
app.config.globalProperties.$http = axios
app.config.globalProperties.$message = ElMessage
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import * as echarts from 'echarts'

// vue3不支持
// // 导入富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
// // 导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme

// 设置axios的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 设置拦截器
axios.interceptors.request.use(config => {
    // console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
        // 固定写法（在最后必须return config）
    return config
})
const app = createApp(App)
installElementPlus(app)
    // 将axios挂载到Vue实例上
app.config.globalProperties.$http = axios
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$filters = {
        dateFormat(originCal) {
            const dt = new Date(originCal)

            const y = dt.getFullYear()
            const m = (dt.getMonth() + 1 + '').padStart(2, '0') // padStart判断是否满足位数，不满足前面添加字符串
            const d = (dt.getDate() + '').padStart(2, '0')

            const hh = (dt.getHours() + '').padStart(2, '0')
            const mm = (dt.getMinutes() + '').padStart(2, '0')
            const ss = (dt.getSeconds() + '').padStart(2, '0')

            return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        }
    }
    //     // 将富文本编辑器，注册为全局可用的组件
    // app.use(VueQuillEditor)

app.use(router).mount('#app')
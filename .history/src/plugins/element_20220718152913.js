// 按需导入
import 'element-plus/dist/index.css'
import {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElMessage,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElIcon,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElCard,
    ElRow,
    ElCol,
    ElTableColumn,
    ElTable,
    ElSwitch,
    ElTooltip,
    ElPagination,
    ElDialog,
    ElMessageBox,
    ElTag,
    ElTree,
    ElSelect,
    ElOption
} from 'element-plus'
import {
    Location,
    Menu as IconMenu,
    Search,
    Edit,
    Delete,
    Setting
}
ElIcons from '@element-plus/icons'

import {
    ArrowRight,
    CaretRight
} from '@element-plus/icons-vue'

// 注册成全局组件
export default (app) => {
    app.use(ElButton)
    app.use(ElForm)
    app.use(ElFormItem)
    app.use(ElInput)
    app.use(ElRow)
    app.use(ElContainer)
    app.use(ElHeader)
    app.use(ElAside)
    app.use(ElMain)
    app.use(ElMenu)
    app.use(ElSubMenu)
    app.use(ElMenuItem)
    app.use(ElIcon)
    app.use(ElBreadcrumb)
    app.use(ElBreadcrumbItem)
    app.use(ElCard)
    app.use(ElCol)
    app.use(ElTable)
    app.use(ElTableColumn)
    app.use(ElSwitch)
    app.use(ElTooltip)
    app.use(ElPagination)
    app.use(ElDialog)
    app.use(ElTag)
    app.use(ElTree)
    app.use(ElSelect)
    app.use(ElOption)
    app.component('location', Location)
    app.component('iconMenu', IconMenu)
    app.component('arrowright', ArrowRight)
    app.component('search', Search)
    app.component('edit', Edit)
    app.component('delete', Delete)
    app.component('setting', Setting)
    app.component('caretright', CaretRight)
    app.config.globalProperties.$message = ElMessage
    app.config.globalProperties.$confirm = ElMessageBox.confirm
}
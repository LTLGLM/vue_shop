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
    Setting,
    CircleCheckFilled
} from '@element-plus/icons'

import {
    ArrowRight,
    CaretRight,
    Menu
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
    app.component(Location.name, Location)
    app.component(Menu.name, Menu)
    app.component(ArrowRight.name, ArrowRight)
    app.component(Search.name, Search)
    app.component(Edit.name, Edit)
    app.component(Delete.name, Delete)
    app.component(Setting.name, Setting)
    app.component(CaretRight.name, CaretRight)
    app.component(CircleCheckFilled.name, CircleCheckFilled)
    app.config.globalProperties.$message = ElMessage
    app.config.globalProperties.$confirm = ElMessageBox.confirm
}
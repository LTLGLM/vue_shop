<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb :separator-icon="arrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table
        class="treetable"
        :data="catelist"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
      >
        <!-- <el-table-column type="index" label="#" /> -->
        <el-table-column prop="cat_name" label="分类名称" />
        <!-- 是否有效 -->
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <el-icon
              v-if="scope.row.cat_deleted === false"
              style="color: lightgreen"
              ><CircleCheckFilled
            /></el-icon>
            <el-icon v-else style="color: red"><CircleCloseFilled /></el-icon>
          </template>
        </el-table-column>
        <!-- 排序 -->
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope">
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag
              type="success"
              size="mini"
              v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" size="mini" v-else>三级</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="190px">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showEditCateDialog(scope.row.cat_id)"
              ><el-icon><Edit /></el-icon>编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="removeCate(scope.row.cat_id)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="querInfo.pagenum"
          v-model:page-size="querInfo.pagesize"
          :page-sizes="[3, 5, 10, 15]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      v-model="addCateDialogVisble"
      title="添加分类"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 添加分类的表单 -->
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        :rules="addCateFormRules"
        label-width="120px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name" />
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options 用来指定数据源 -->
          <!-- props 用来指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
            :popper-append-to-body="false"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCateDialogVisble = false">取消</el-button>
          <el-button type="primary" @click="addCate">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑分类的对话框 -->
    <el-dialog
      v-model="editCateDialogVisble"
      title="编辑分类"
      width="50%"
      @close="editCateDialogClosed"
    >
      <!-- 编辑分类的表单 -->
      <el-form
        ref="editCateFormRef"
        :model="editCateForm"
        :rules="editCateFormRules"
        label-width="120px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editCateDialogVisble = false">取消</el-button>
          <el-button type="primary" @click="editCate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类的数据列表，默认为空
      catelist: [],
      // 总数据条数
      total: 0,
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisble: false,
      // 添加分类的表单数据
      addCateForm: {
        // 将要添加的分类的名称
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认添加的是一级分类
        cat_level: 0,
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级别选择器的配置对象
      cascaderProps: {
        checkStrictly: true,
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      // 选中的父级分类的Id数组
      selectedKeys: ref([]),
      // 控制编辑分类对话框的显示与隐藏
      editCateDialogVisble: false,
      // 编辑分类的表单数据
      editCateForm: {},
      // 编辑分类的表单验证规则对象
      editCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.querInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }
      // 把数据列表，赋值给 catelist
      this.catelist = res.data.result
      // console.log(this.catelist)
      // 为总数据条数赋值
      this.total = res.data.total
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pagenum的改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getCateList()
    },
    // 点击按钮，展示添加分类的对话框
    showAddCateDialog() {
      // 先获取父级分类数据列表
      this.getParentCateList()
      // 再展示出对话框
      this.addCateForm.cat_name = ''
      this.addCateDialogVisble = true
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 },
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败！')
      }

      this.parentCateList = res.data
      console.log(this.parentCateList)
    },
    // 选择项发生变化触发这个函数
    parentCateChanged() {
      console.log(this.selectedKeys)
      // 如果selectedKeys 数组中的 length 大于0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectedKeys !== null) {
        // 父级分类的Id
        this.addCateForm.cat_pid =
          this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        // 父级分类的Id
        this.addCateForm.cat_pid = 0
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0
      }
    },
    // 点击按钮，添加新的分类
    addCate() {
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          'categories',
          this.addCateForm
        )

        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败！')
        }

        this.$message.success('添加分类成功！')
        this.getCateList()
        this.addCateDialogVisble = false
      })
    },
    // 监听添加分类对话框的关闭事件，重置表单数据
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    // 点击按钮，展示编辑分类的对话框
    async showEditCateDialog(id) {
      const { data: res } = await this.$http.get('categories/' + id)
      if (res.meta.status !== 200)
        return this.$message.error('获取分类名称失败！')

      this.editCateForm = res.data
      console.log(this.editCateForm)
      this.editCateDialogVisble = true
    },
    // 点击按钮，提交编辑分类
    editCate() {
      this.$refs.editCateFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'categories/' + this.editCateForm.cat_id,
          this.editCateForm
        )

        if (res.meta.status !== 200)
          return this.$message.error('更新分类名称失败！')

        this.$message.success('更新分类名称成功')
        this.getCateList()
        this.editCateDialogVisble = false
      })
    },
    // 监听编辑分类对话框的关闭事件，重置表单数据
    editCateDialogClosed() {
      this.$refs.editCateFormRef.resetFields()
    },
    // 根据id删除对应的商品分类
    async removeCate(id) {
      // 弹窗询问角色是否修改数据
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品分类，是否继续？',
        '提示',
        {
          confimButtonTxt: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      console.log(confirmResult)
      if(confirmResult !== 'confirm'){
        return this.$message.info('已取消删除！')
      }

      const {data:res} = await this.$http.delete('categories/' + id)
      if(res.meta.status !==200) return this.$message.error('删除商品分类失败！')

      this.$message.success('删除商品分类成功！')
      this.getCateList()
    },
  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>

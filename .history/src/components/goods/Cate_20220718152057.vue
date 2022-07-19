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
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table
        :data="catelist"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        index=this.catelist.length
      >
        <el-table-column type="index" label="#" />
        <el-table-column prop="cat_name" label="分类名称" />
        <el-table-column prop="cat_deleted" label="是否有效" />
        <el-table-column prop="cat_level" label="排序" />
        <el-table-column label="操作" />
      </el-table>

      <!-- 分页区域 -->
    </el-card>
  </div>
</template>

<script>
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

      // console.log(res.data);
      // 把数据列表，赋值给 catelist
      this.catelist = res.data.result
      console.log(this.catelist)
      // 为总数据条数赋值
      this.total = res.data.total
    },
  },
}
</script>

<style lang="less" scoped></style>

<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb :separator-icon="arrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        show-icon
        title="注意: 只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
      />

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类: </span>
          <!-- 选择商品分类的级联选择框 -->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // 商品列表数据
        catelist:[]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { date: res } = await this.$http.get('categories')

      if(res.meta.status !==200){
        return this.$message.error('获取商品分类失败！')
      }

        this.catelist = res.data
        console.log(this.catelist);

    },
  },
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
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
        123
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    created(){},
    methods:{

    }
}
</script>

<style lang="less" scoped>

</style>
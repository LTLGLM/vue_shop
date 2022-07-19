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
                <el-button type="primary"></el-button>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    created(){

    },
    methods:{

    }
}
</script>

<style lang="less" scoped>

</style>
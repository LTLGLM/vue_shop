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
        <el-table :data="list" stripe border>
            <el-table-column type="index" :index="indexMethod" label="#"></el-table-column>
        </el-table>

        <!-- 分页区域 -->
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            querInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            // 商品分类的数据列表，默认为空
            catelist:[]
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        // 获取商品分类数据
        async getCateList(){

        }
    }
}
</script>

<style lang="less" scoped>

</style>
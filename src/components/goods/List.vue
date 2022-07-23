<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb :separator-icon="arrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <template #append>
              <el-button @click="getGoodsList"
                ><el-icon><search /></el-icon
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddpage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          width="95px"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="70px"
        ></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="145px">
          <template v-slot="scope">
            {{ $filters.dateFormat(scope.row.add_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editList(scope.row.goods_id)"
              ><el-icon><Edit /></el-icon>编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="removeById(scope.row.goods_id)"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        v-model:currentPage="queryInfo.pagenum"
        v-model:page-size="queryInfo.pagesize"
        :page-sizes="[5, 10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 编辑商品对话框 -->
    <!-- <el-dialog v-model="editListdialogVisible" title="编辑商品" width="50%">
      <el-form
        ref="editFormRef"
        :model="editListDate"
        :rules="editFormRules"
        label-width="120px"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editListDate.goods_name" />
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editListDate.goods_price" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editListDate.goods_number" />
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editListDate.goods_weight" />
        </el-form-item>
        <el-form-item label="商品介绍">
          <textarea
            style="width: 745px; height: 167px"
            v-model="editListDate.goods_introduce"
          ></textarea>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            v-model:file-list="imgpath"
            :action="uploadURL"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture-card"
            :headers="headerObj"
            :on-success="handleSuccess"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editListdialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editListdialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog> -->

    <!-- 图片预览 -->
    <!-- <el-dialog title="图片预览" v-model="previewVisible" width="50%">
      <img :src="previewPath" alt="" class="preivewImg" />
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      // 商品列表
      goodslist: [],
      // 总数据条数
      total: 0,
      // 控制编辑商品对话框的显示与隐藏
      // editListdialogVisible: false,
      // // 根据id查询到的商品数据
      // editListDate: [],
      // // 编辑商品的验证规则
      // editFormRules: {
      //   goods_name: [
      //     { required: true, message: '请输入商品名称', trigger: 'blur' },
      //   ],
      //   goods_price: [
      //     { required: true, message: '请输入商品价格', trigger: 'blur' },
      //   ],
      //   goods_number: [
      //     { required: true, message: '请输入商品重量', trigger: 'blur' },
      //   ],
      //   goods_weight: [
      //     { required: true, message: '请输入商品数量', trigger: 'blur' },
      //   ],
      // },
      // // 上传图片的URL地址
      // uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // // 图片上传组件的headers请求头
      // headerObj: {
      //   Authorization: window.sessionStorage.getItem('token'),
      // },
      // // 存放照片url
      // imgpath:[],
      // previewVisible:false,
      // previewPath:''
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 根据分页获取对应的商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: this.queryInfo,
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品数据失败！')
      }

      // this.$message.success('获取商品列表成功！')
      // console.log(res.data)
      this.goodslist = res.data.goods
      this.total = res.data.total
    },
    //
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.error('已取消删除！')
      }

      const { data: res } = await this.$http.delete(`goods/${id}`)

      if (res.meta.status !== 200) {
        return this.$message.error('删除商品失败！')
      }

      this.$message.success('删除商品成功！')
      this.getGoodsList()
    },
    goAddpage() {
      this.$router.push('/goods/add')
    },
    // 点击按钮，展示编辑商品数据
    // async editList(id) {
    //   console.log(id)
    //   const { data: res } = await this.$http.get('goods/' + id)
    //   if (res.meta.status !== 200) {
    //     return this.$message.error('获取商品数据失败！')
    //   }
    //   res.data.pics.forEach((item,index) => {
    //     this.imgpath.push(
    //       {'name':index,'url':item.pics_sma_url}
    //     )
    //   });
    //   this.editListDate = res.data
    //   console.log(this.editListDate);
    //   this.editListdialogVisible = true
    // },
    // // 处理图片预览效果
    // handlePreview(file) {
    //   console.log(file);
    //   this.previewPath = this.imgpath
    //   this.previewVisible = true
    // },
    // // 处理移除图片的操作
    // handleRemove() {},
    // // 监听图片上传成功的事件
    // handleSuccess() {
      
    // },
  },
}
</script>

<style>
</style>
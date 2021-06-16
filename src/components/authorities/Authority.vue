<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
<!--      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="table">
      <el-table
        :data="tableData"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        border
        height="500px"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="#"
          width="180">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="pid"
          label="父级">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column
          label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level==='0'">一层</span>
            <span v-else-if="scope.row.level==='1'">二层</span>
            <span v-else-if="scope.row.level==='2'">三层</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </el-card>
</template>

<script>
export default {
  name: 'Authority',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await this.$http.get('rights/list')
      const {data, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.tableData = data
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}

.table{
  margin-top: 20px;
}
</style>

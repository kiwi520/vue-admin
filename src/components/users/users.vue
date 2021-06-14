<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
<!--          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="search">
      <el-input clearable placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
      <el-button type="success" class="add-item" @click="addModelFlag = true">添加用户</el-button>
    </div>

    <div class="table">
      <el-table
        border
        empty-text
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="#"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="create_time"
          :formatter="dateFormat"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-text="否"
              inactive-text="是"
              @change="changeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
                         @click="showEditUserDialog(scope.row)"></el-button>
              <el-button size="mini" plain type="success" icon="el-icon-check" circle
                         @click="showUserRoleDialog(scope.row)"></el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle
                         @click="handleDelete(scope.row.id)"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size=pagesize
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="新增用户"
      :visible.sync="addModelFlag"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form label-position="left" label-width="80px" :model="addModelFormData" ref="addModelFormData">
          <el-form-item label="用户名" required>
            <el-input v-model="addModelFormData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input v-model="addModelFormData.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="addModelFormData.email"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addModelFormData.phone"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addModelFlag = false">取 消</el-button>
      <el-button type="primary" @click="handleAddModel">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑用户"
      :visible.sync="editModelFlag"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form label-position="left" label-width="80px" :model="editModelFormData" ref="editModelFormData">
           <el-input type="hidden" v-model="editModelFormData.id"></el-input>
          <el-form-item label="用户名" required>
            <el-input disabled v-model="editModelFormData.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editModelFormData.email"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="editModelFormData.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editModelFlag = false">取 消</el-button>
      <el-button type="primary" @click="handleEditModel">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="分配用户权限"
      :visible.sync="editRoleModelFlag"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form label-position="left" label-width="80px" :model="editRoleModelFormData" ref="editRoleModelFormData">
           <el-input type="hidden" v-model="editRoleModelFormData.id"></el-input>
          <el-form-item label="用户名" required>
            <el-input disabled v-model="editRoleModelFormData.username"></el-input>
            <el-input type="hidden" v-model="editRoleModelFormData.id"></el-input>
          </el-form-item>

          <el-form-item
            label="用户权限">
          <template>
            <el-select v-model="currentRole">
              <el-option
                v-for="item in roleData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>

        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editRoleModelFlag = false">取 消</el-button>
      <el-button type="primary" @click="changeRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      search: '',
      tableData: [],
      roleData: [],
      pagesize: 1,
      currentPage: 1,
      total: 0,
      addModelFlag: false,
      editModelFlag: false,
      editRoleModelFlag: false,
      currentRole: '',
      currentRoleUserId: '',
      addModelFormData: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      editModelFormData: {
        id: '',
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      editRoleModelFormData: {
        id: '',
        username: '',
        rid: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
        // email: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  created () {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    async getUserList () {
      const res = await this.$http.get('users', {
        params: {
          query: this.search,
          pagenum: this.currentPage,
          pagesize: this.pagesize
        }
      })

      const {data: {users, total}, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.tableData = users
        this.total = total
      }
    },
    async getRoleList () {
      const res = await this.$http.get('roles')

      const {data, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.roleData = data.map(item => {
          return {'value': item.id, 'label': item.roleName}
        })
      }
    },
    dateFormat (val) {
      return this.$options.filters.fmtDate(val)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.currentPage = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    handleAddModel () {
      this.$refs['addModelFormData'].validate((valid) => {
        if (valid) {
          this.postAddModel()
        } else {
          return false
        }
      })
    },
    handleEditModel () {
      this.$refs['editModelFormData'].validate((valid) => {
        if (valid) {
          this.postEditModel()
        } else {
          return false
        }
      })
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delModel(id)
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
        return true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        return false
      })
    },
    showEditUserDialog (scope) {
      this.editModelFlag = true
      this.editModelFormData = scope
      // Object.assign(this.editModelFormData, scope)
    },
    showUserRoleDialog (scope) {
      this.editRoleModelFlag = true
      this.editRoleModelFormData = scope
      this.getUserInfo(scope.id)
    },
    changeStatus (scope) {
      this.putChangeStatus(scope)
    },
    changeRole () {
      this.putChangeRole()
    },
    async getUserInfo (id) {
      const res = await this.$http.get('users/' + id)
      const {data, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
        return false
      } else {
        this.currentRoleUserId = data.id
        this.currentRole = data.rid
        console.log(this.editRoleModelFormData)
        return true
      }
    },
    async postAddModel () {
      const res = await this.$http.post('users', this.addModelFormData)
      const {meta: {msg, status}} = res.data
      if (status !== 201) {
        this.$message.error(msg)
        return false
      } else {
        this.$message.success(msg)

        this.addModelFormData = {
          username: '',
          password: '',
          email: '',
          mobile: ''
        }
        this.getUserList()

        this.addModelFlag = false
        return true
      }
    },
    async postEditModel () {
      const res = await this.$http.put('users/' + this.editModelFormData.id, {
        id: this.editModelFormData.id,
        email: this.editModelFormData.email,
        mobile: this.editModelFormData.mobile
      })
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
        return false
      } else {
        this.$message.success(msg)

        this.editModelFormData = {
          username: '',
          password: '',
          email: '',
          mobile: ''
        }
        this.getUserList()
        this.editModelFlag = false
        return true
      }
    },
    async delModel (id) {
      const res = await this.$http.delete('users/' + id)
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
        return false
      } else {
        this.$message.success(msg)
        this.currentPage = 1
        this.getUserList()
        this.addModelFlag = false
        return true
      }
    },
    async putChangeStatus (scope) {
      const res = await this.$http.put('users/' + scope.id + '/state/' + scope.mg_state)
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
        return false
      } else {
        this.$message.success(msg)
        // this.currentPage = 1
        // this.getUserList()
        // this.addModelFlag = false
        return true
      }
    },
    async putChangeRole () {
      const res = await this.$http.put('users/' + this.currentRoleUserId + '/role', {id: this.currentRoleUserId, rid: this.currentRole})
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
        return false
      } else {
        this.$message.success(msg)
        // this.currentPage = 1
        this.getUserList()
        this.editRoleModelFlag = false
        return true
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}

.search {
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.add-item {
  margin-left: 10px;
}

.table {
  margin-top: 20px;
}

.page {
  margin: 10px 10px 0 0;
  display: flex;
  justify-content: end;
}
</style>

<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="search">
      <el-input clearable placeholder="请输入内容" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getRoleList"></el-button>
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
        @expand-change="expandChange"
        style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(x,i) in scope.row.children" :key="i">
              <el-col :span="2">
                <el-tag class="tag" @close="colseTag(x.id,scope.row)" closable>{{ x.authName }}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="22">
                <el-row v-for="(y,j) in x.children" :key="j">
                  <el-col :span="2">
                    <el-tag class="tag" @close="colseTag(y.id,scope.row)" closable type="success">{{
                        y.authName
                      }}
                    </el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="22">
                    <el-row>
                      <el-tag class="tag" @close="colseTag(z.id,scope.row)" closable v-for="(z,h) in y.children"
                              :key="h" type="warning">{{ z.authName }}
                      </el-tag>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <span v-if="scope.row.children.length === 0">未分配权限</span>
          </template>

        </el-table-column>

        <el-table-column
          prop="id"
          label="#"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
                         @click="showEditRoleDialog(scope.row)"></el-button>
              <el-button size="mini" plain type="success" icon="el-icon-check" circle
                         @click="showUserAuthDialog(scope.row)"></el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle
                         @click="handleDelete(scope.row.id)"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="编辑角色"
        :visible.sync="editRoleModelFlag"
        width="30%"
        :before-close="handleEditRoleClose">
      <span>
        <el-form label-position="left" label-width="80px" :model="editRoleModelFormData" ref="editModelFormData">
           <el-input type="hidden" v-model="editRoleModelFormData.id"></el-input>
          <el-form-item label="角色名称" required>
            <el-input v-model="editRoleModelFormData.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="editRoleModelFormData.roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </span>
        <span slot="footer" class="dialog-footer">
      <el-button @click="editRoleModelFlag = false">取 消</el-button>
      <el-button type="primary" @click="handleEditRoleModel">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
        title="分配角色权限"
        :visible.sync="roleAuthModelFlag"
        width="30%"
        :before-close="handleClose">
        <template>
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
            highlight-current
            :default-checked-keys="arrchenkded"
            :props="defaultProps">
          </el-tree>
        </template>
        <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="changeAuth">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      search: '',
      addModelFlag: false,
      roleAuthModelFlag: false,
      editRoleModelFlag: false,
      roleAuthRoleID: '',
      tableData: [],
      treeData: [],
      editRoleModelFormData: {},
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      arrchenkded: []
    }
  },
  created () {
    this.getRoleList()
    this.getAuthList()
  },
  methods: {
    expandChange (row, expandedRows) {
      // console.log('row')
      // console.log(row)
      // console.log(row)
      // console.log(expandedRows)
      // console.log(expandedRows)
      // console.log(expandedRows)
    },
    colseTag (authId, role) { // 取消权限
      // console.log(authId)
      // console.log(roleId)
      this.deleteAuth(authId, role)
    },
    showUserAuthDialog (scope) { // 打开授权model
      this.roleAuthModelFlag = true
      this.roleAuthRoleID = scope.id
      this.roleAuthRoleID = scope.id

      this.recursionAuth(scope.children)
      //
      this.arrchenkded = Array.from(new Set(this.arrchenkded))
      // console.log(scope)
      // console.log(scope)
    },
    showEditRoleDialog (scope) { // 打开授权model
      this.editRoleModelFlag = true
      this.editRoleModelFormData = scope
      // this.roleAuthRoleID = scope.id
      // this.roleAuthRoleID = scope.id
      //
      // this.recursionAuth(scope.children)
      // //
      // this.arrchenkded = Array.from(new Set(this.arrchenkded))
      // console.log(scope)
      // console.log(scope)
    },
    changeAuth () {
      // console.log(this.$refs.tree.getCheckedKeys())
      // 获取所有全选中的id
      let checkedKeys = this.$refs.tree.getCheckedKeys()
      // 获取所有非全选中的id
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys(true)

      let checked = [...checkedKeys, ...halfCheckedKeys]

      this.RoleAuthorization(checked.join(','))
    },
    recursionAuth (arr) {
      arr.forEach(item => {
        // this.arrchenkded.push(item.id) // 获取全部权限ID
        if (item.hasOwnProperty('children')) {
          if (item.children.length > 0) {
            this.recursionAuth(item.children)
          }
        } else {
          // console.log('item.id')
          // console.log(item.id)
          // console.log('item.id')
          this.arrchenkded.push(item.id) // 只获取第三层权限ID
        }
      })
    },
    handleCancel () {
      this.roleAuthModelFlag = false
      this.$refs.tree.setCheckedKeys([])
      this.arrchenkded = []
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.tree.setCheckedKeys([])
          this.arrchenkded = []
          done()
        })
        .catch(_ => {
        })
    },
    handleEditRoleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    handleDelete (rid) {
      this.deleteRole(rid)
    },
    handleEditRoleModel () {
      console.log(this.editRoleModelFormData)
      this.editeRole(this.editRoleModelFormData)
    },
    async RoleAuthorization (rids) {
      const res = await this.$http.post('roles/' + this.roleAuthRoleID + '/rights', {
        rids: rids
      })
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        // this.tableData = data
        this.$message.success(msg)
        this.roleAuthModelFlag = false
        this.$refs.tree.setCheckedKeys([])
        this.arrchenkded = []
        this.getRoleList()
      }
    },
    async getRoleList () {
      const res = await this.$http.get('roles')
      const {data, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.tableData = data
      }
    },
    async getAuthList () {
      const res = await this.$http.get('rights/tree')
      const {data, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.treeData = data
      }
    },
    async deleteAuth (authId, role) {
      const res = await this.$http.delete('roles/' + role.id + '/rights/' + authId)
      // console.log(res)
      const {data, meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        role.children = data
        this.$message.success(msg)
      }
    },
    async deleteRole (roleId) {
      const res = await this.$http.delete('roles/' + roleId)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.$message.success(msg)
        this.getRoleList()
      }
    },
    async editeRole (row) {
      const res = await this.$http.put('roles/' + row.id, {
        roleName: row.roleName,
        roleDesc: row.roleDesc
      })
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status !== 200) {
        this.$message.error(msg)
      } else {
        this.$message.success(msg)
        this.editRoleModelFlag = false
        this.getRoleList()
      }
    }
  }
}
</script>

<style scoped>

.search {
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
}

.add-item {
  margin-left: 10px;
}

.table {
  margin-top: 20px;
}

.tag {
  margin: 10px;
}
</style>

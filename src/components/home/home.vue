<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4" class="left-log">
          <img src="" class="logo" alt="无法显示图片">
        </el-col>
        <el-col :span="18" class="middle">
          后台管理系统
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="logout" @click.prevent="handleLogout" href="#">推出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">
              <i class="el-icon-setting"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="authorities">
              <i class="el-icon-setting"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-setting"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-setting"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-setting"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-setting"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-setting"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  methods: {
    handleLogout () {
      localStorage.clear()

      this.$message.success('推出成功')

      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  /*background-color: #B3C0D1;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 60px;*/
}

.header {
  height: 60px;
  background-color: #B3C0D1;
}

.header .left-log {
  text-align: center;
}

.header .logo {
  height: 60px;
  /*margin: 10px 0;*/
  text-align: center;
  border-radius: 10px;
}

.middle {
  line-height: 60px;
  text-align: center;
}

.logout {
  line-height: 60px;
}

.aside {
  background-color: #D3DCE6;
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 200px;*/
}

.main {
  height: 100%;
  background-color: #E9EEF3;
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

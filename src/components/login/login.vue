<template>
  <div class="login-container">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h2 class="login-title">用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" >登录</el-button>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formData: {
        name: '',
        password: '',
        type: ''
      }
    }
  }
}
</script>

<style scoped>

.login-container{
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container .login-form{
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}

/*.login-container .login-form .login-title{*/
/*  width: 100%;*/
/*  height: 30px;*/
/*  margin: 0 30px 0 0;*/
/*}*/

.login-container .login-form .login-btn{
  width: 100%;
}

</style>

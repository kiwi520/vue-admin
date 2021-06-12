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
      <el-button @click.prevent="handleLogin" class="login-btn" type="primary">登录</el-button>
    </el-form>
<!--    <el-alert-->
<!--      :title="msg"-->
<!--      type="error">-->
<!--    </el-alert>-->
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
      },
      msg: ''
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', {username: this.formData.name, password: this.formData.password})

      const {data, meta: {msg, status}} = res.data
      if (status === 200) {
        // alert(msg)
        // this.msg = msg
        this.$router.push({name: 'home'})
        this.$message(msg)
      } else {
        // alert(msg)
        // this.msg = msg
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style scoped>

.login-container {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container .login-form {
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

.login-container .login-form .login-btn {
  width: 100%;
}

</style>

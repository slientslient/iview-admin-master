<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
<!--          <p class="login-tip">输入任意用户名和密码即可</p>-->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit({userName, password}) {
      this.handleLogin({userName, password}).then(res => {
        console.log("登陆res====", res)
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
        this.$router.push({
          name: this.$config.homeName
        })
      }).catch(err=>{
        if(err.data && err.data.code == '30001'){
          this.$Message.error(err.data.message);
        }else{
          this.$Message.error(err);
        }
      })
    }
  }
}
</script>

<style>

</style>

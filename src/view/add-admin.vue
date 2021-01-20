<template>
  <Row type="flex" align="middle" justify="center" >
    <i-col span="12" v-show="!isSuccessFlag">
   <Card >
     <p slot="title">新增管理员</p>
   <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" >
<!--     <Row type="flex" align="middle" justify="center">-->
      <FormItem prop="username" span="8">
        <p>用户名(必填)</p>
        <Input v-model="form.username" placeholder="请输入用户名">
          <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>
        </Input>
      </FormItem>
       <FormItem prop="cnname" span="8" >
         <p>中文名</p>
         <Input  v-model="form.cnName" placeholder="请输入中文名称">
          <span slot="prepend">
            <Icon :size="14" type="ios-person"></Icon>
          </span>
         </Input>
       </FormItem>
<!--     </Row>-->
<!--     <Row type="flex" align="middle" justify="center">-->
    <FormItem prop="password" span="8">
      <p>密码(必填)</p>
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
     <FormItem prop="adminRole" span="8" >
       <p>角色</p>
       <Input v-model="form.adminRole" placeholder="请输入角色">
        <span slot="prepend">
          <Icon :size="14" type="ios-person"></Icon>
        </span>
       </Input>
     </FormItem>
<!--     </Row>-->
<!--     <Row type="flex" align="middle" justify="center">-->
     <FormItem prop="passwordCom" span="8">
       <p>确认密码(必填)</p>
       <Input type="password" v-model="form.passwordCom" placeholder="请再次输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
       </Input>
     </FormItem>
     <FormItem prop="email" span="8" >
       <p>邮箱</p>
       <Input type="password" v-model="form.email" placeholder="请输入邮箱">
        <span slot="prepend">
          <Icon :size="14" type="md-mail"></Icon>
        </span>
       </Input>
     </FormItem>
<!--     </Row>-->
 <Row type="flex" align="middle" justify="center">
      <FormItem span="6">
        <Button @click="handleSubmit" type="primary" >提交</Button>
      </FormItem>
     </Row>
  </Form>
  </Card>
    </i-col>
    <i-col span="6" v-show="isSuccessFlag" >
      <Alert type="success" show-icon >
        提示
        <span slot="desc">已成功添加</span>
      </Alert>
      <Row type="flex" align="middle" justify="center">
      <Button @click="handleNew" type="primary" >再次添加</Button>
      </Row>
    </i-col>
  </Row>

</template>
<style>
.add-admin-cr{
 border-radius: 10px;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
</style>
<script>
import axios from 'axios'
import { addAdminUser } from '@/api/data'
import { setToken, getToken } from '@/libs/util'
export default {
  name: 'add-admin',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordComRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      isSuccessFlag:false,
      form: {
        username: '',
        password: '',
        passwordCom:'',
        cnName:'',
        adminRole:'',
        email:''
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.userNameRules,
        password: this.passwordRules,
        passwordCom:this.passwordComRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if(this.form.password !=this.form.passwordCom){
            this.$Message.error("两次输入的密码不一致");
          }else{
            let adminData={
              adminname: this.form.username,
              password: this.form.password,
              cnName:this.form.cnName,
              adminRole:this.form.adminRole,
              email:this.form.email
            }
            // let url = "https://api.ustc.design/admin/add"
            // const token = getToken()
            //
            // const config = {
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': 'Bearer ' + token
            //   }
            // }
            // axios.post(url,adminData,config)
            addAdminUser(adminData).then(res=>{
              console.log('addAd',res)
              if(res.data.code == '20202'){
                this.$Message.error("该用户名已存在");
              }else if(res.data.code == '30101'){
                this.$Message.error("无添加权限");
              }else if(res.data.code == '20000'){
                this.isSuccessFlag = true
                //this.$Message.success("已成功添加");
                this.form = {}
              }else{
                this.$Message.error(res.data.message);
              }

            }).catch(err=>{
              console.log('add-admin',err)
              this.$Message.error(err);
            })
          }

        }
      })
    },
    handleNew(){
      this.isSuccessFlag = false
    }
  }
}
</script>
<!--<template>-->
<!--  <div>-->
<!--    <Card shadow title="社区">-->
<!--      <row class="join-page" :gutter="32">-->
<!--        <i-col span="10">-->
<!--          <img class="qq-group-img" src="../assets/images/icon-qr-qq-wechat.png">-->
<!--          <row type="flex" justify="center">-->
<!--            <i-col span="12">-->
<!--              <p>QQ 群号：621780943</p>-->
<!--            </i-col>-->
<!--            <i-col span="12"></i-col>-->
<!--          </row>-->
<!--        </i-col>-->
<!--        <i-col span="14">-->
<!--          <div class="join-page-other">-->
<!--            <Button to="https://zhuanlan.zhihu.com/feview" target="_blank" size="large">-->
<!--              <img src="../assets/images/icon-social-zhihu.svg" class="join-page-other-icon">-->
<!--              iView 知乎专栏-->
<!--            </Button>-->
<!--            <Button to="https://juejin.im/user/56fe494539b0570054f2e032" target="_blank" size="large">-->
<!--              <img src="../assets/images/icon-social-juejin.svg" class="join-page-other-icon">-->
<!--              掘金-->
<!--            </Button>-->
<!--            <Button to="https://live.bilibili.com/1353202" target="_blank" size="large">-->
<!--              <img src="../assets/images/icon-social-bilibili.svg" class="join-page-other-icon">-->
<!--              活动直播间-->
<!--            </Button>-->
<!--            <Button to="https://twitter.com/iViewUI" target="_blank" size="large">-->
<!--              <img src="../assets/images/icon-social-twitter.svg" class="join-page-other-icon">-->
<!--              Twitter-->
<!--            </Button>-->
<!--          </div>-->
<!--        </i-col>-->
<!--      </row>-->
<!--    </Card>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'join_page',-->
<!--  data () {-->
<!--    return {-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--  .join-page{-->
<!--    text-align: center;-->
<!--  }-->
<!--  .qq-group-img{-->
<!--    width: 100%;-->
<!--  }-->
<!--  .join-page-other-icon{-->
<!--    width: 20px;-->
<!--    vertical-align: middle;-->
<!--    margin-right: 6px;-->
<!--  }-->
<!--  .join-page-other{-->
<!--    text-align: left;-->
<!--  }-->
<!--  .join-page-other .ivu-btn{-->
<!--    margin-right: 6px;-->
<!--  }-->
<!--</style>-->

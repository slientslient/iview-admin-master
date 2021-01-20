<template>
  <Row type="flex" align="middle" justify="center" >
    <i-col span="12" v-show="!isSuccessFlag">
      <Card>
        <p slot="title">编辑公告</p>
        <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
<!--          <FormItem prop="type">-->
<!--            <h5>类型(可不填):</h5>-->
<!--            <Input v-model="form.type" placeholder="请输入类型">-->
<!--               <span slot="prepend">-->
<!--              <Icon :size="16" type="ios-attach" />-->
<!--            </span>-->
<!--            </Input>-->
<!--          </FormItem>-->
          <FormItem prop="title">
            <h5>标题:</h5>
            <Input  v-model="form.title" placeholder="请输入标题">
              <span slot="prepend">
              <Icon :size="16" type="ios-archive-outline" />
            </span>
            </Input>
          </FormItem>

          <FormItem prop="content">
            <h5>内容:</h5>

            <Input v-model="form.content" placeholder="请输入内容">
              <span slot="prepend">
              <Icon :size="16" type="ios-book-outline" />
            </span>
            </Input>
          </FormItem>
          <FormItem prop="status">
            <!--            <Input  v-model="form.status" placeholder="请输入标题">-->
            <!--            </Input>-->
            <h5>状态:</h5>
            <div style="border: #e6e6e6 1px solid;border-radius: 6px">
              <Row type="flex">

                <Dropdown  trigger="click" style="margin-left:10px"  @on-click="choose">
                  <a href="javascript:void(0)" name="none" v-html='this.form.status'>

                  </a>
                  <Icon type="ios-arrow-down"></Icon>
                  <DropdownMenu slot="list">
                    <DropdownItem name="publish" >发布</DropdownItem>
                    <DropdownItem name="delay">暂不发布</DropdownItem>
                    <DropdownItem name="delete">删除</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Row>
            </div>
          </FormItem>
          <FormItem>
            <Row type="flex" align="middle" justify="center">
              <FormItem span="6">
                <Button @click="submitNotice" type="primary" >提交</Button>
              </FormItem>
            </Row>
          </FormItem>
        </Form>
      </Card>
    </i-col>
    <i-col span="6" v-show="isSuccessFlag" >
      <Alert type="success" show-icon >
        提示
        <span slot="desc">已成功编辑，刷新当前页面可再次编辑</span>
      </Alert>
<!--      <Row type="flex" align="middle" justify="center">-->
<!--        <Button @click="handleNew" type="primary" >再次添加</Button>-->
<!--      </Row>-->
    </i-col>
  </Row>
</template>
<script>
import { editNotice,getNoticeLatest } from '@/api/data'
export default {
  name: 'add-notice',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }

  },
  data () {
    return {
      isSuccessFlag:false,
      form: {
        type: '',
        title:'',
        content:'',
        status:''
      }
    }
  },
  created(){
    this.getNotice()
  },
  computed: {
    rules () {
      return {
        title: this.userNameRules,
        content: this.passwordRules,
      }
    }
  },
  methods:{
    getNotice(){
      getNoticeLatest().then(res=>{
        console.log("getNoticce",res)
        if(res.data.code == '20000'){
          let status = ''
          let data = res.data.data
          if(data.status == '1'){
            status = '发布'
          }else if(data.status == '0'){
            status = '暂不发布'
          }else if(data.status == '-1'){
            status = '删除'
          }
          this.form.status = status
          this.form.type = data.type
          this.form.title = data.title
          this.form.content = data.content
        }
      }).catch(err=>{
        console.log(err)
        this.$Message.error(err)
      })
    },
    submitNotice(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("status==",this.form.status)
          let statuss = ''
          if(this.form.status == '请选择状态'){
            this.$Message.error("请选择状态");
          }else{
            if(this.form.status == '发布'){
              statuss = '1'
            }else if(this.form.status == '暂不发布'){
              statuss = '0'
            }else if(this.form.status == '删除'){
              statuss = '-1'
            }
            let noticeData={
              type: this.form.type,
              title: this.form.title,
              content:this.form.content,
              status:statuss
            }
            editNotice(noticeData).then(res=>{
              console.log('add notice',res)
              if(res.data.code == '20000'){
                this.isSuccessFlag = true
                //this.$Message.success("已成功添加");
                this.form = {}
                this.form.status = '请选择状态'
              }else{
                this.$Message.error(res.data.message)
              }

            }).catch(err=>{
              console.log('add notice',err)
              this.$Message.error(err);
            })




          }


        }
      })

    },
    handleNew(){
      this.isSuccessFlag = false
    },
    choose(name){
      console.log('name==',name)
      if(name == 'none'){
        this.form.status = '请选择状态'
      }else if(name == 'publish'){
        this.form.status = '发布'
      }else if(name=='delay'){
        this.form.status = '暂不发布'
      }else if(name == 'delete'){
        this.form.status = '删除'
      }

    }

  }
}

</script>

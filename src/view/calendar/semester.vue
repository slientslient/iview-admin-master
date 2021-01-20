<template >
  <div>
    <div style="height:100px"></div>
  <Row type="flex" align="middle" justify="center" v-show="!isSuccessFlag">
    <i-col span="6">
      <Button @click="handleSubmit" type="primary" >点击按钮开始同步</Button>
    </i-col>
  </Row>
 <div style="height:100px" v-show="!isSuccessFlag">

 </div>
  <Row type="flex" align="middle" justify="center" v-show="!isSuccessFlag">
    <i-col span="12">
      <Progress :percent="percentage" status="active" />
    </i-col>
  </Row>


    <Row  type="flex" align="middle" justify="center" >
      <i-col span="6" v-show="isSuccessFlag" >
        <Alert type="success" show-icon >
          提示
          <span slot="desc">已成功同步</span>
        </Alert>
        <Row type="flex" align="middle" justify="center">
          <Button @click="handleNew" type="primary" >再次同步</Button>
        </Row>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { syncSemester } from '@/api/data'
export default {
  name: 'add-calendar',
  data () {
  return {
    percentage:0,
    isSuccessFlag:false
    }
  }
  ,
  methods: {
  handleSubmit() {
     console.log('calendar')
    this.timer = setInterval(this.addProgress, 100);
    console.log('semreq')
    syncSemester().then(res=>{
      console.log('semester',res)
      if(res.data.code == '20000'){
        this.isSuccessFlag = true
        //this.$Message.success("已成功添加");
        clearInterval(this.timer);
        this.percentage =100;

      }else{
        this.$Message.error(res.data.message);
      }
    }).catch(err=>{
      console.log('add-admin',err)
      this.$Message.error(err);
    })

  },
    //成功
    handleNew(){
      this.isSuccessFlag = false
    },
    //進度條
    addProgress(){
    if(this.percentage <90){
      this.percentage +=10
    }
    }
  }
}
</script>

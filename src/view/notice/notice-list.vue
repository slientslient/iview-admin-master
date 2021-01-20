<template>
  <Row type="flex" align="middle" justify="center" >
    <i-col span="20" >
      <Card>
        <Table border :columns="columns7" :data="data6" height="400"></Table>
      </Card>
    </i-col>
  </Row>
</template>
<script>
export default {
  data () {
    return {
      columns7: [
        {
          title: '日期',
          key: 'createdTime',
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data6: []
    }
  },
  create(){
    this.getTableData()
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1);
    },
    getTableData(){

    }
  }

}
</script>

<template>
    <div class="sendmessage">
      <div class="box">
        <el-row>
          <el-col :offset="3" :span="2"><div class="to">to:</div></el-col>
          <el-col :offset="1" :span="16"><el-input class="boder" v-model="touser" clearable  placeholder="输入接收方ID"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :offset="1" :span="4"><div class="to">content:</div></el-col>
          <el-col :offset="1" :span="16"><el-input class="boder" placeholder="正文" type="textarea" :autosize="{ minRows: 12, maxRows: 12}" v-model="content"></el-input></el-col>
        </el-row>
        <el-button type="success" plain class="b1" @click="send">留言</el-button>
        <el-button type="primary" plain class="b2" @click="back">返回</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            touser:'',
            content:''
          }
        },
      methods:{
          async send(){
            let result = await this.$axios.post('/message/send',{
              touser:this.touser,
              content:this.content
            }).catch((e)=>{})
            if(result.data.code==2)
            {
              this.$message({
                type:'success',
                message:'发送成功'
              })
              this.touser=''
              this.content=''
            }
            else if(result.data.code==1)
            {
              this.$message.error('没有此用户')
            }
            else if(result.data.code==0)
            {
              this.$message.error('发送失败')
            }
          },
          back()
          {
            this.$emit('cancle')
          }
      }
    }
</script>

<style scoped lang="less">
.sendmessage{
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.7);
  z-index: 1;
  filter:contrast(200%);
  .box{
    border-color: blue;
    border-width: 1px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: white;
    z-index: 2;
    width: 400px;
    height: 400px;
    .boder{
      border-style: solid;
      border-width: 1px;
      border-color: #47494e;
      margin-top: 10px;
    }
    .to{
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    .b1{
      position: absolute;
      bottom: 10px;
      left: 32%;
      transform: translate(-50%);
    }
    .b2{
      position: absolute;
      bottom: 10px;
      left: 66%;
      transform: translate(-50%);
    }
  }
}
</style>

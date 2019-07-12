<template>
    <div class="message">
      <div class="errormessage" v-if="nodata">没有信息</div>
      <div v-for="(item,index) in messagelist" :key="index">
        <el-tag>from:{{item.fromuser}}</el-tag>
        <el-tag type="info">{{item.content}}</el-tag>
      </div>
    </div>
</template>

<script>
    export default {
      async created(){
        let {data}=await this.$axios.post('/message/check',{}).catch((e)=>{})
        if(data.code)
        {
           for(let i of data.messagelist)
           {
             this.messagelist.push(i)
           }
          this.messagelist.reverse()
           if(this.messagelist.length>0)
           {
             this.nodata=false
           }
           else
           {
             this.nodata=true
           }
        }
      },
      data(){
        return{
          messagelist:[],
          nodata:true
        }
      }
    }
</script>

<style scoped lang="less">
.message{
  background: #f7f8fb;
  width: 60vw;
  .errormessage{
    font-weight: bold;
    text-align: center;
    width: 100%;
    font-size: x-large;
  }
  .el-tag{
    height: 50px;
    line-height: 50px;
    font-size: 15px;
  }
}
</style>

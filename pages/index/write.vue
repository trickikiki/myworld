<template>
    <div class="write">
      <el-input v-model="title" placeholder="标题"></el-input>
      <el-input type="textarea" autosize v-model="content" placeholder="正文"></el-input>
      <el-button type="primary" round @click="write">提交</el-button>
    </div>
</template>

<script>
    export default {
      middleware: 'permission',
      data(){
        return{
          title:'',
          content:''
        }
      },
      methods:{
        async write(){
          if(this.$store.state.login){
            let {data}=await this.$axios.post('/article/write',{
              title:this.title,
              content:this.content
            }).catch((e)=>{})
            if(data.code)
            {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.content=''
              this.title=''
            }
            else
            {
              this.$message({
                message:'保存失败',
                type:'warning'
              })
            }
          }
        }
      }
    }
</script>

<style scoped lang="less">
.write{
  background: #f7f8fb;
  width: 60vw;
  .el-button{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

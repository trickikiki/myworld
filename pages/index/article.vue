<template>
    <div class="article">
      <h1>{{title}}</h1>
      <el-input type="textarea" autosize v-model="content" readonly="true"></el-input>
      <el-button type="danger" icon="el-icon-delete" circle @click="deletearticle"></el-button>
    </div>
</template>

<script>
    export default {
      middleware: 'permission',
      data(){
        return{
          title:this.$store.state.title,
          content:this.$store.state.content
        }
      },
      methods:{
        async deletearticle()
        {
          let {data}=await this.$axios.post('/article/delete',{
            title:this.title
          }).catch((e)=>{})
          if(data.code)
          {
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.$emit('changeroute','/home')
          }
          else
          {
            this.$message.error('删除失败')
          }
        }
      }
    }
</script>

<style scoped lang="less">
.article{
  background: #f7f8fb;
  width: 60vw;
  h1{
    text-align: center;
  }
  .el-button{
    position: relative;
    left: 100%;
    transform: translateX(-100%);
  }
}
</style>

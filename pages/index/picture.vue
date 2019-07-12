<template>
    <div class="picture">
      <div class="errormessage" v-if="nodata">没有图片</div>
      <el-card shadow="hover" :body-style="{padding:'0px'}" v-for="(item,index) in pics" :key="index">
        <el-button type="danger" icon="el-icon-delete" circle @click = deletepic($event) :id="item"></el-button>
        <img :src="item" />
      </el-card>
    </div>
</template>

<script>
    export default {
      async created(){
        let result=await this.$axios.get('/pic/getpic',{}).catch((e)=>{})
        if(result.data.code)
        {
          for(let i of result.data.picurls)
          {
            this.pics.push(i)
          }
          if(this.pics.length>0)
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
            pics:[],
            nodata:true
          }
        },
      methods:{
        async deletepic(event){
          let el=event.currentTarget
          let {data}= await this.$axios.post('/pic/delete',{
            filename:el.id.slice(1)
          }).catch((e)=>{})
          if(data.code){
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.pics.splice(this.pics.indexOf(el.id),1)
            if(this.pics.length==0)
            {
              this.nodata=true
            }
          }
          else
          {
            this.$message.error("删除失败")
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .picture{
    background: #f7f8fb;
    width: 60vw;
    display: flex;
    flex-wrap: wrap;
    .errormessage{
      font-weight: bold;
      text-align: center;
      width: 100%;
      font-size: x-large;
    }
    .el-card{
      position: relative;
      width: 150px;
      height: 150px;
      margin: 20px;
      text-align: center;
      .el-button{
        position: absolute;
        right: 0px;
        top: 0px;
      }
      img{
        height: 100%;
        width: 100%;
      }
    }
  }
</style>

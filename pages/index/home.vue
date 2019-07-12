<template>
    <div class="home">
      <div class="errormessage" v-if="nodata">没有日记</div>
      <el-card shadow="hover" :body-style="{padding:'0px'}" v-for="(item,index) in titles" :key="index">
        <div @click="look(item)">
          {{item}}
        </div>
      </el-card>
    </div>
</template>

<script>
    export default {
      middleware: 'permission',
      async created(){
        let {data}=await this.$axios.post('/article/gettitle',{}).catch((e)=>{console.log(e)})
        if(data.code)
        {
          for(let i of data.titles)
          {
            this.titles.push(i)
          }
          if(this.titles.length>0)
          {
            this.nodata=false
          }
          else
          {
            this.nodata=true
          }
        }
        else
        {
          this.nodata=true
        }
      },
      data(){
          return {
            titles:[],
            nodata:false
          }
      },
      methods:{
        async look(item){
          let {data} = await this.$axios.post('/article/look',{
            title:item
          }).catch((e)=>{})
          this.$store.commit('savearticle',{title:data.title,content:data.content})
          this.$emit('changeroute','/article')
        }
      }
    }
</script>

<style scoped lang="less">
.home{
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
    width: 150px;
    height: 150px;
    margin: 20px;
    text-align: center;
    cursor: pointer;
    div{
      height: 150px;
      line-height: 150px;
      font-weight: bold;
      font-family: sans-serif;
      font-size: x-large;
    }
  }
}
</style>

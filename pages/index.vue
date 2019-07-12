<template>
    <div class="home">
      <allheader></allheader>
      <div class="leftpannel">
        <router-link to="/write" tag="div">写日记</router-link>
        <router-link to="/uploadfile" tag="div">上传文件</router-link>
        <router-link to="/uploadpic" tag="div">上传相片</router-link>
        <div @click="savemusicurl">上传音乐外链</div>
        <div @click="sendmessage">发送私信</div>
      </div>
      <sendmessage v-if="showmessage" @cancle="hiden()"></sendmessage>
      <router-view class="mymain" @changeroute="jump($event)"></router-view>
    </div>
</template>

<script>
  import allheader from '@/components/allheader.vue'
  import sendmessage from '@/components/sendmessage.vue'
    export default {
      middleware: 'permission',
      components:{allheader,sendmessage},
      data(){
        return{
          showmessage:false
        }
      },
      methods:{
        savemusicurl(){
          this.$prompt('请输入网易云音乐外链','添加音乐到音乐库',{
            confirmButtonText:'确定',
            cancelButtonText:'取消',
            inputPattern:/^http:\/\/music.163.com\/song\/media\/outer\/url\?id=[0-9]+.mp3$/,
            inputErrorMessage: '外链应该类似http://music.163.com/song/media/outer/url?id=562118482.mp3'
          }).then(async (value)=>{
            console.log(value)
            let result = await this.$axios.post('/music/upload',{
              musicurl:value.value
            }).catch(()=>{
              this.$message({
                type:'info',
                message:'上传失败'
              })
            })
            if(result.data.code)
            {
              this.$message({
                type:'success',
                message:'上传成功'
              })
            }
            else
            {
              this.$message({
                type:'info',
                message:'上传失败'
              })
            }
          }).catch(()=>{
            /*this.$message({
              type:'info',
              message:'只支持网易云外链'
            })*/
          })
        },
        jump($event){
          this.$router.push($event)
        },
        sendmessage(){
          this.showmessage=true
        },
        hiden(){
          this.showmessage=false
        }
      }
    }
</script>

<style scoped lang="less">
.leftpannel{
  position: fixed;
  background: #f7f8fb;
  top: 60px;
  left: 10px;
  width: 200px;
  height: 400px;
  div{
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
    margin-top: 15px;
    position: relative;
    top:10px;
    height: 30px;
    font-family: sans-serif;
    font-weight: bold;
    line-height: 30px;
    &:hover{
      background: #3a8ee6;
      cursor: pointer;
    }
  }
}
  .mymain{
    position: absolute;
    top: 60px;
    left: 300px;
  }
</style>

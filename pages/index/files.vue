<template>
    <div class="files">
      <div class="errormessage" v-if="nodata">没有文件</div>
      <el-card shadow="hover" :body-style="{padding:'0px'}" v-for="(item,index) in files" :key="index">
        <el-button type="danger" icon="el-icon-delete" circle @click = deletefile($event) :id="item.name"></el-button>
        <a :href="item.durl" :download="item.name">
          {{item.name}}
        </a>
      </el-card>
    </div>
</template>

<script>
    export default {
        async created(){
          let {data}= await this.$axios.get('/file/getfile',{}).catch((e)=>{})
          if(data.code)
          {
            let filename=[]
            let fileurls=[]
            for(let i of data.filesname)
            {
              filename.push(i)
            }
            for(let i of data.filesurl)
            {
              fileurls.push(i)
            }
            this.files=[]
            for(let i=0;i<filename.length;i++)
            {
              this.files.push({name:filename[i],durl:fileurls[i]})
            }
            if(this.files.length>0)
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
            files:[],
            nodata:true
          }
      },
      methods:{
          async deletefile(event){
            let el=event.currentTarget
            let {data}=await this.$axios.post('/file/delete',{
              filename:el.id
            }).catch((e)=>{})
            if(data.code)
            {
              this.$message({
                type:'success',
                message:'删除成功'
              })
              let result = await this.$axios.get('/file/getfile',{}).catch((e)=>{})
              if(result.data.code)
              {
                let filename=[]
                let fileurls=[]
                for(let i of result.data.filesname)
                {
                  filename.push(i)
                }
                for(let i of result.data.filesurl)
                {
                  fileurls.push(i)
                }
                this.files=[]
                for(let i=0;i<filename.length;i++)
                {
                  this.files.push({name:filename[i],durl:fileurls[i]})
                }
                if(this.files.length>0)
                {
                  this.nodata=false
                }
                else
                {
                  this.nodata=true
                }
              }
            }
          }
      }
    }
</script>

<style scoped lang="less">
.files{
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
    cursor: pointer;
    .el-button{
      position: absolute;
      right: 0px;
      top: 0px;
    }
    a{
      display: block;
      height: 150px;
      line-height: 150px;
      font-weight: bold;
      font-family: sans-serif;
      font-size: x-large;
      text-decoration: none;
      color: #000000;
      &:link{
        color: #000000;
      }
      &:visited{
        color: #000000;
      }
      &:hover{
        color: #000000;
      }
    }
  }
}
</style>

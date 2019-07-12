<template>
    <div class="upload">
      <el-upload action="/file/uploadfile"
                 :file-list="filelist"
                 :auto-upload="false"
                 ref="submit"
                 :show-file-list=showfilelist
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          filelist:[],
          showfilelist:true
        }
      },
      methods:{
        submitUpload(){
          this.$refs.submit.submit()
        },
      }
    }
</script>

<style scoped lang="less">
.upload{
  background: #f7f8fb;
  width: 60vw;
  height: 500px;
}
</style>

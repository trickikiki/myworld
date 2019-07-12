<template>
  <div class="upload">
    <el-upload action="/pic/upload"
               :file-list="filelist"
               :auto-upload="false"
               ref="submit"
               :show-file-list=showfilelist
               accept=".jpg,.jpeg,.png,.gif"
               :before-upload="beforeUpload"
    >
      <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
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
      beforeUpload(file){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'jpeg'
        const extension3 = testmsg === 'png'
        const extension4 = testmsg === 'gif'
        if(!extension && !extension2 && !extension3 && !extension4) {
          this.$message({
            message: '上传文件只能是图片!',
            type: 'warning'
          });
        }
        return extension || extension2 || extension3 || extension4
      }
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

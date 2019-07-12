<template>
  <div class="container">
    <div class="mask">
      <div class="box">
        <div class="banner">LOGIN</div>
        <div class="write">
          <span>帐号</span><input type="text" placeholder="username" v-model="username" />
          <span>密码</span><input type="password" placeholder="password" v-model="password" />
        </div>
        <button class="b1" @click="login">登录</button>
        <button class="b2" @click="tosignup">注册</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    async login(){
      if(this.username!=''&&this.password!='')
      {
        let result = await this.$axios.post('/user/login',{
          username:this.username,
          password:this.password
        }).catch((err)=>{console.log(err)})
        if(result.data.code)
        {
          this.$store.commit('setuserinfo',this.username)
          this.$router.push('/home')
        }
        else
        {
          this.$message.error('帐号或密码错误')
          this.$store.commit('logout')
        }
      }
      else
      {
        this.$message.error('帐号或密码不能为空')
      }
    },
    tosignup(){
      this.$router.push('/signup')
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  position: absolute;
  width: 100vw;
  height: 100vh;
  .mask{
    position: absolute;
    width: 300px;
    height: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #060c21;
    .box{
      background: #060c21;
      position: absolute;
      width: 300px;
      height: 400px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .banner{
        font-family: sans-serif;
        color: #f7f8fb;
        font-size: 39px;
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%,-50%);
      }
      .write{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        span{
          color: #f7f8fb;
          position: relative;
          top: 3.5vh;
          left: -40px;
        }
        input{
          height: 3.5vh;
          margin-bottom: 15px;
          background: none;
          color: #f7f8fb;
          border-left: none;
          border-top: none;
          border-right: none;
        }
      }
      .b1{
        position: absolute;
        left: 5vw;
        top: 40vh;
      }
      .b2{
        position: absolute;
        left: 10vw;
        top: 40vh;
      }
      button{
        background: none;
        color: #00bcd4;
        border-style: none;
        width: 4vw;
        height: 3vh;
        border-radius: 10px;
        &:hover{
          background: #00bcd4;
          cursor: pointer;
          color: #f7f8fb;
        }
      }
    }
    &:before{
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      z-index: -1;
      background: linear-gradient(235deg,#89ff00,#060c21,#00bcd4);
    }
    &:after{
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      z-index: -2;
      filter:blur(40px);
      background: linear-gradient(235deg,#89ff00,#060c21,#00bcd4);
    }
  }
}
</style>

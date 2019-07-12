<template>
  <div class="header">
    <ul>
      <router-link to="/home" tag="li">日记</router-link>
      <router-link to="/files" tag="li">云盘</router-link>
      <router-link to="/picture" tag="li">相册</router-link>
      <router-link to="/message" tag="li">查看私信</router-link>
    </ul>
    <audio autoplay controls :src="musicsrc" @ended="nextsong" ref="music">不支持播放音乐</audio>
    <div class="userinfo" @click="logout">
      <div class="name">{{username}}</div>
      <svg t="1561356970046" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="879" width="32" height="32"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 822c-50.5 0-99.5-9.9-145.6-29.4-35-14.8-67.3-34.7-96.2-59.3 9.3-98.4 102.7-177.2 219.8-186 7.2 0.8 14.5 1.2 21.9 1.2s14.7-0.4 21.9-1.2c117.2 8.8 210.6 87.7 219.8 186-28.9 24.5-61.1 44.4-96.2 59.3C611.5 876.1 562.5 886 512 886z m-92.6-385.9c-24.7-24.7-38.4-57.6-38.4-92.6 0-35 13.6-67.9 38.4-92.6s57.6-38.4 92.6-38.4c35 0 67.9 13.6 92.6 38.4 24.7 24.7 38.4 57.6 38.4 92.6 0 35-13.6 67.9-38.4 92.6-24.7 24.7-57.6 38.4-92.6 38.4-35 0-67.9-13.6-92.6-38.4z m393.7 233.8c-3.4-9.9-7.5-19.7-12.2-29.3-16.2-32.8-39.2-62.2-68.5-87.4-26-22.3-55.7-40.2-87.9-53.3 44.3-37.6 72.5-93.7 72.5-156.4 0-113.2-91.8-205-205-205s-205 91.8-205 205c0 62.7 28.2 118.8 72.5 156.4-32.2 13.1-61.9 31-87.9 53.3-29.3 25.1-52.3 54.5-68.5 87.4-4.7 9.6-8.8 19.4-12.2 29.3-17.4-23.6-32-49.1-43.5-76.3-19.5-46.1-29.4-95-29.4-145.6s9.9-99.5 29.4-145.6c18.8-44.5 45.8-84.5 80.2-118.9 34.4-34.4 74.4-61.3 118.9-80.2 46.1-19.5 95-29.4 145.6-29.4s99.5 9.9 145.6 29.4c44.5 18.8 84.5 45.8 118.9 80.2s61.3 74.4 80.2 118.9c19.5 46.1 29.4 95 29.4 145.6s-9.9 99.5-29.4 145.6c-11.7 27.2-26.2 52.7-43.7 76.3z" p-id="880" fill="#2c2c2c"></path></svg>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          musicsrc:'http://music.163.com/song/media/outer/url?id=562118482.mp3',
          musicid:-1,
        }
      },
      computed:{
        username(){
          return this.$store.state.user
        }
      },
      methods:{
          async logout(){
            let result = await this.$axios.post('/user/logout',{}).catch((e)=>{})
            if(result.data.code)
            {
              this.$store.commit('logout')
              this.$router.push('/')
            }
          },
        async nextsong(){
          let result = await this.$axios.get('/music').catch((e)=>{})
          if(result.data.code)
          {
            this.musicid=(this.musicid+1)%result.data.musiclist.length
            this.$refs.music.src=result.data.musiclist[this.musicid]
            this.$refs.music.load()
            this.$refs.music.play()
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .header{
    position: absolute;
    top: 0px;
    width: 100vw;
    height: 40px;
    background: #f7f8fb;
    ul{
      position: relative;
      left: 50px;
      li{
        cursor: pointer;
        list-style: none;
        float: left;
        height: 40px;
        line-height: 40px;
        margin-right: 20px;
        font-weight: bold;
        font-size: larger;
      }
    }
    .userinfo{
      position: absolute;
      height: 40px;
      right: 20px;
      cursor: pointer;
      .icon{
        position: absolute;
        top: 0px;
        right: 0px;
        height: 40px;
      }
      .name{
        position: relative;
        left: -40px;
        height: 40px;
        line-height: 40px;
      }
    }
    audio{
      position: absolute;
      top: 0px;
      right: 140px;
      height: 40px;
    }
  }
</style>

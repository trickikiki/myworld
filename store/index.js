import axios from 'axios'

export const state=()=>({
  user:'',
  login:false,
  title:'',
  content:''
})
export const mutations={
  savearticle(state,playload){
    state.title=playload.title
    state.content=playload.content
  },
  setuserinfo(state,user){
    state.user=user
    state.login=true
  },
  logout(state){
    state.login=false
    state.user=''
  },
}



export const actions={
  nuxtServerInit({commit},{req,redirect}){
    if(req.session.username)
    {
      commit('setuserinfo',req.session.username)
    }
    else
    {
      redirect('/login')
    }
  },
}

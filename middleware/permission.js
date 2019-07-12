export default function({store,redirect,route}){
  if(!store.state.login){
    redirect('/login')
  }
}

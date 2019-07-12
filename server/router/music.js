const express = require('express')
var Music=require('../db/music')
const router = express.Router()
router.get('/',async function(req,res){
  let param={}
  param.code=0
  param.musiclist=[]
  let musics = await Music.findAll({
    where:{
      username:req.session.username
    }
  }).catch((e)=>{console.log(e)})
  if(!(musics==''))
  {
    for(let i of musics)
    {
      param.musiclist.push(i.musicurl)
    }
    param.code=1
  }
  res.json(param)
})
router.post('/upload',async function(req,res){
  let param={}
  param.code=0
  console.log(req.body.musicurl)
  let result = await Music.create({
    username:req.session.username,
    musicurl:req.body.musicurl
  }).catch((e)=>{console.log(e)})
  if(result)
  {
    param.code=1
  }
  res.json(param)
})
module.exports=router

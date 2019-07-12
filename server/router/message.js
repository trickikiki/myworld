const express = require('express')
const Message=require('../db/message')
const User=require('../db/user')
const router = express.Router()

router.post('/send',async function(req,res){
  let param={}
  param.code=0
  let result1 = await User.findOne({
    where:{
      username:req.body.touser
    }
  }).catch((e)=>{console.log(e)})
  if(result1!=null)
  {
    let result = await Message.create({
      fromuser:req.session.username,
      touser:req.body.touser,
      content:req.body.content
    }).catch((e)=>{console.log(e)})
    if(result)
    {
      param.code=2
    }
  }
  else
  {
    param.code=1
  }
  res.json(param)
})

router.post('/check',async function(req,res){
  let param={}
  param.code=0
  param.messagelist=[]
  let result = await Message.findAll({
    where:{
      touser:req.session.username
    }
  }).catch((e)=>{})
  if(result)
  {
    for(let i of result)
    {
      param.messagelist.push({fromuser:i.fromuser,content:i.content})
    }
    param.code=1
  }
  res.json(param)
})

module.exports=router

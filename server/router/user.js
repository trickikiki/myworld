const express = require('express')
var User=require('../db/user')

const router = express.Router()

router.post('/login',async function(req,res){
  let param={}
  param.code=0
  var users=await User.findOne({
    where:{
      username:req.body.username
    }
  }).catch((e)=>{})
  if(users)
  {
    if(users.password==req.body.password) {
      param.code = 1
      req.session.username=req.body.username
    }
  }
  res.json(param)
})

router.post('/signup',async function(req,res){
  console.log(req.body.username)
  let param={}
  let users=await User.findAll({
    where:{
      username:req.body.username
    }
  }).catch((e)=>{console.log(e)})
  console.log(users)
  if(users.length==0)
  {
    console.log(users)
    var result = await User.create({
      username:req.body.username,
      password:req.body.password
    })
    console.log(result)
    if(result)
    {
      param.code=1
    }
  }
  else{
    param.code=0
  }
  res.json(param)
})

router.post('/logout',function (req,res) {
  let param={}
  param.code=1
  req.session.destroy((err)=>{
    if(err){
      param.code=0
    }
  })
  res.json(param)
})

router.get('/getuserinfo',function(req,res){
  let param={}
  param.code=0
  if(req.session)
  {
    if(req.session.username)
    {
      param.code=1
      param.username=req.session.username
    }
  }
  res.json(param)
})
module.exports=router

const express = require('express')
const Article=require('../db/article')
const router = express.Router()
router.post('/gettitle',async function(req,res){
  let param={}
  param.titles=[]
  param.code=0
  let articles = await Article.findAll({
    where:{
      username:req.session.username
    }
  }).catch((e)=>{console.log(e)})
  if(articles)
  {
    for(let i of articles)
    {
      param.titles.push(i.title)
    }
    param.code=1
  }
  res.json(param)
})
router.post('/write',async function(req,res){
  let param={}
  param.code=0
  let result=await Article.create({
    username:req.session.username,
    title:req.body.title,
    content:req.body.content
  }).catch((e)=>{console.log(e)})
  if(result)
  {
    param.code=1
  }
  res.json(param)
})
router.post('/delete',async function(req,res){
  let param={}
  param.code=0
  let result = await Article.destroy({
    where:{
      username:req.session.username,
      title:req.body.title
    }
  }).catch((e)=>{console.log(e)})
  if(result)
  {
    param.code=1
  }
  res.json(param)
})
router.post('/look',async function(req,res){
  let param={}
  param.code=0
  let result = await Article.findOne({
    where:{
      username:req.session.username,
      title:req.body.title
    }
  }).catch((e)=>{})
  if(!(result===[]))
  {
    param.code=1
    param.content=result.content
    param.title=req.body.title
  }
  res.json(param)
})
module.exports=router

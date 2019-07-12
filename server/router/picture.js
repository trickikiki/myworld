const express=require('express')
const fs =require('fs')
const fsPromises=require('fs').promises
const multer  = require('multer');
let Picture=require('../db/picture')
const router = express.Router()
let storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'static/')
  },
  filename:function(req,file,cb){
    cb(null,req.session.username+'-'+file.originalname)
  }
})
let upload = multer({storage:storage})
router.post('/upload',upload.any(),async function(req,res){
  let param={}
  param.code=0
  for(let i of req.files)
  {
    let result = await Picture.create({
      username:req.session.username,
      picurl:i.originalname
    }).catch((e)=>{console.log(e)})
    if(result)
    {
      param.code=1
    }
  }
  res.json(param)
})
router.post('/delete',async function(req,res){
  let param={}
  param.code=1
  let result = await Picture.destroy({
    where:{
      username:req.session.username,
      picurl:req.body.filename.slice(req.body.filename.indexOf('-')+1)
    }
  }).catch((e)=>{console.log(e)})
  await fsPromises.unlink("static/"+req.session.username+'-'+req.body.filename.slice(req.body.filename.indexOf('-')+1)).catch((e)=>{console.log(e)})
  res.json(param)
})
router.get('/getpic',async function(req,res){
  let param={}
  param.code=0
  param.picurls=[]
  let result = await Picture.findAll({
    where:{
      username:req.session.username
    }
  }).catch((e)=>{console.log(e)})
  if(result)
  {
    for(let i of result)
    {
      param.picurls.push('/'+req.session.username+'-'+i.picurl)
    }
    param.code=1
  }
  res.json(param)
})
module.exports=router

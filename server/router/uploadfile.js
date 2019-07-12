const express=require('express')
const fs =require('fs')
const fsPromises=require('fs').promises
const multer  = require('multer');
let Uploadfile=require('../db/uploadfile')
const router = express.Router()
let storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploadfile/')
  },
  filename:function(req,file,cb){
    cb(null,req.session.username+'-'+file.originalname)
  }
})
let upload = multer({storage:storage})
router.post('/uploadfile',upload.any(),async function(req,res){
  let param={}
  param.code=0
  for(let i of req.files)
  {
    let result = await Uploadfile.create({
      username:req.session.username,
      fileurl:i.originalname
    }).catch((e)=>{console.log(e)})
    if(result)
    {
      param.code=1
    }
  }
  res.json(param)
})
router.get('/getfile',async function(req,res){
  let param={}
  param.code=0
  param.filesname=[]
  param.filesurl=[]
  let result = await Uploadfile.findAll({
    where:{
      username:req.session.username,
    }
  }).catch((e)=>{console.log(e)})
  if(result)
  {
    param.code=1
    for(let i of result)
    {
      param.filesname.push(i.fileurl)
      param.filesurl.push('/uploadfile/'+req.session.username+'-'+i.fileurl)
    }
  }
  res.json(param)
})
router.post('/delete',async function(req,res){
  let param={}
  param.code=1
  let result = await Uploadfile.destroy({
    where:{
      username:req.session.username,
      fileurl:req.body.filename
    }
  }).catch((e)=>{console.log(e)})
  await fsPromises.unlink("uploadfile/"+req.session.username+'-'+req.body.filename).catch((e)=>{console.log(e)})
  res.json(param)
})
module.exports=router

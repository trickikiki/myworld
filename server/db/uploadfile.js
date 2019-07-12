const Sequelize=require('sequelize')
var sequelize=require('./config')

var Uploadfile=sequelize.define('uploadfiles',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  username:Sequelize.STRING(255),
  fileurl:Sequelize.STRING(255)
},{
  timestamps:false
})
module.exports=Uploadfile

const Sequelize=require('sequelize')
var sequelize=require('./config')

var Message=sequelize.define('messages',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  fromuser:Sequelize.STRING(255),
  touser:Sequelize.STRING(255),
  content:Sequelize.TEXT
},{
  timestamps:false
})
module.exports=Message

const Sequelize=require('sequelize')
var sequelize=require('./config')

var Article=sequelize.define('articles',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  username:Sequelize.STRING(255),
  title:Sequelize.STRING(255),
  content:Sequelize.TEXT
},{
  timestamps:false
})
module.exports=Article

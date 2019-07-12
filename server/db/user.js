const Sequelize=require('sequelize')
var sequelize=require('./config')

var User=sequelize.define('user',{
  username:{
    type:Sequelize.STRING(255),
    primaryKey:true
  },
  password:Sequelize.STRING(255),

},{
  timestamps:false
})
module.exports=User

const Sequelize=require('sequelize')
var sequelize=require('./config')

var Picture=sequelize.define('pictures',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  username:Sequelize.STRING(255),
  picurl:Sequelize.STRING(255)
},{
  timestamps:false
})
module.exports=Picture

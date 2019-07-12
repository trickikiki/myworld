const Sequelize=require('sequelize')
var sequelize=require('./config')

var Music=sequelize.define('musics',{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  username:{
    type:Sequelize.STRING(255),
  },
  musicurl:Sequelize.STRING(255)
},{
  timestamps:false
})
module.exports=Music

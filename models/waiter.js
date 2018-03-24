'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const WaiterSchema = new Schema({

  email: {type: String, unique: true, required: true, lowercase: true},
  password: {type:String, select:false, required: true},
  name: String,
  address: String,
  phone: String,
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date
  
})

WaiterSchema.pre('save',function(next){
  let waiter = this
  if(waiter.password == undefined) return next()

  bcrypt.genSalt(10, (err,salt)=>{
    if(err) return next()

    bcrypt.hash(waiter.password, salt, null, (err, hash)=>{
      if(err) return next(err)

      waiter.password = hash
      next()
    })
  })
})

WaiterSchema.methods.comparePass = function (pass,isMatch) {
  mongoose.model('Waiter', WaiterSchema).findOne({ email: this.email },'password', (err, waiter) => {
        bcrypt.compare(pass, waiter.password, function(err, res) {
          if (err)return console.log(err)
          isMatch(res)
        })
    })
}

module.exports = mongoose.model('Waiter',WaiterSchema)

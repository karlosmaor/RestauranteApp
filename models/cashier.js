'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const CashierSchema = new Schema({

  email: {type: String, unique: true, required: true, lowercase: true},
  password: {type:String, select:false, required: true},
  name: String,
  address: String,
  phone: String,
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date

})

CashierSchema.pre('save',function(next){
  let cashier = this
  if(cashier.password == undefined) return next()

  bcrypt.genSalt(10, (err,salt)=>{
    if(err) return next()

    bcrypt.hash(cashier.password, salt, null, (err, hash)=>{
      if(err) return next(err)

      cashier.password = hash
      next()
    })
  })
})

CashierSchema.methods.comparePass = function (pass,isMatch) {
  mongoose.model('Cashier', CashierSchema).findOne({ email: this.email },'password', (err, cashier) => {
        bcrypt.compare(pass, cashier.password, function(err, res) {
          if (err)return console.log(err)
          isMatch(res)
        })
    })
}

module.exports = mongoose.model('Cashier',CashierSchema)

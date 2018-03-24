'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const RestaurantSchema = new Schema({

  email: {type: String, unique: true, required: true, lowercase: true},
  password: {type:String, select:false, required: true},
  name: String,
  avatar: String,
  address: String,
  phone: String,
  description: String,
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  waiters: [{type: Schema.Types.ObjectId, ref: 'Waiter'}],
  cashiers: [{type: Schema.Types.ObjectId, ref: 'Cashier'}],
  position: {
    lat: {type: Number, default: 0.0},
    lng: {type: Number, default: 0.0}
  },
  schedule: [{hs:Number,ms:Number,he:Number,me:Number}],
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date,
  version: Number
})

RestaurantSchema.pre('save',function(next){
  let restaurant = this
  if(restaurant.password == undefined) return next()

  bcrypt.genSalt(10, (err,salt)=>{
    if(err) return next()

    bcrypt.hash(restaurant.password, salt, null, (err, hash)=>{
      if(err) return next(err)

      restaurant.password = hash
      next()
    })
  })
})

RestaurantSchema.methods.comparePass = function (pass,isMatch) {
  mongoose.model('Restaurant', RestaurantSchema).findOne({ email: this.email },'password', (err, restaurant) => {
        bcrypt.compare(pass, restaurant.password, function(err, res) {
          if (err)return console.log(err)
          isMatch(res)
        })
    })
}

module.exports = mongoose.model('Restaurant',RestaurantSchema)

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({

  waiter: {type: Schema.Types.ObjectId, ref: 'Waiter'},
  cashier: {type: Schema.Types.ObjectId, ref: 'Cashier'},
  restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  domiciliario: String,
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  category: String,
  state: Number,
  total: Number,
  comment: String,
  date: Date

})

module.exports = mongoose.model('Order',OrderSchema)

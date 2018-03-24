'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CaracteristicSchema = new Schema({

  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  name: String,
  options: [String],
  prices: [Number],
  multiSelection: Boolean

})

module.exports = mongoose.model('Caracteristic',CaracteristicSchema)

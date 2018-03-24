'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({

  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  name: String,
  avatar: String,
  description: String,
  caracteristics: [{type: Schema.Types.ObjectId, ref: 'Caracteristic'}],
  price: Number,
  numPedidos: Number

})

module.exports = mongoose.model('Product',ProductSchema)

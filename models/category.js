'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({

  restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
  name: String,
  avatar: String,
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}]

})

module.exports = mongoose.model('Category',CategorySchema)

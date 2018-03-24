'use strict'

const express = require('express')
const api = express.Router()
const auth = require('../middlewares/auth')

const ClientCtrl = require('../controllers/client')
const DeliveryCtrl  = require('../controllers/delivery')
const DomiciliarioCtrl  = require('../controllers/domiciliario')
const workerCtrl  = require('../controllers/worker')
const RegisterCtrl = require('../controllers/register')
const MapCtrl = require('../controllers/map')
const AppClientCtrl = require('../controllers/appClient')

//----------------Rutas Cliente-------------//

api.get('/clients', ClientCtrl.getClients)
api.get('/client/:clientId', ClientCtrl.getClient)
api.post('/client/:clientId', ClientCtrl.updateClient)
api.put('/client/:clientId', ClientCtrl.updateClient)
api.delete('/client/:clientId', ClientCtrl.deleteClient)



/*api.get('/private', auth, function(req,res){
  res.status(200).send({message:'Tienes acceso'})
})*/

module.exports = api

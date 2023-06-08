const express =  require('express');
const DBModel = require('../Models/DBModel');
const method = require('./methods/p_route')
const app = express();

const ParamRoute = express.Router();

ParamRoute
.route('/:shorturl')
.get(method.CheckParam, method.RedirectPage)
.delete(method.CheckParam, method.DeletePage)

ParamRoute
.get('/:shorturl/stats', method.CheckParam, method.GetStats)


module.exports = ParamRoute;
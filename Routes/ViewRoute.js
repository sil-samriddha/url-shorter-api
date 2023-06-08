const express = require('express');
const methods = require('./methods/v_routes');
const DBModel = require('../Models/DBModel');
const app = express();


const ViewRoute = express.Router();

ViewRoute
.route('/')
.get(methods.HomePage)
.post(methods.PostUrl)


module.exports = ViewRoute;
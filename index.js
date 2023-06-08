const express = require('express');
const app = express();
const ViewRoute = require('./Routes/ViewRoute');
const path = require('path');
const ParamRoute = require('./Routes/ParamRoute');
require('dotenv').config();

const port = process.env.port || 3000


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', ViewRoute);
app.use('/', ParamRoute);

app.use(function(req, res){
    res.redirect('/404.html');
})


app.listen(port, (e) =>{
    if(!e)
        console.log(`Listening on ${process.env.port}`)
    else
        console.log(e);
});



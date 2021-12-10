const express = require('express');
const app = express();
const morgan = require('morgan');
const product = require('./api/routes/product');
const order = require('./api/routes/order');

app.use(morgan('dev'));//console log requests details
app.use('/product',product);
app.use('/order',order);

app.use('/',(req,res,next)=>{
    res.status(200).json({
        message:"Hi this is an api! HAHAHA"
    });
});

module.exports = app;

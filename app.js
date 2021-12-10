const express = require('express');
const app = express();
const morgan = require('morgan');
const product = require('./api/routes/product');
const order = require('./api/routes/order');


// THESE ARE ALL MIDDLEWARES
app.use(morgan('dev'));//console log requests details
app.use('/product',product);
app.use('/order',order);

// if the requests arent successful,these will run
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;

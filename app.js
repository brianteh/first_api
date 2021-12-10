const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const product = require('./api/routes/product');
const order = require('./api/routes/order');


// THESE ARE ALL MIDDLEWARES
app.use(morgan('dev'));//console log requests details

//parsing url requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Headers to solve CORS - Cross Origin Resource Sharing
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Haeders',
        'Origin, X-Requested-With, Content-Type, Accept, Authourization'
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//routes that handles requests
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

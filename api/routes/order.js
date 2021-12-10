const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET requests"
    });
});

router.post('/',(req,res,next)=>{
    const order_info = {
        product_name:req.body.product_name,
        product_price:req.body.product_price
    };
    onsole.log("Order created:",order_info);
    res.status(201).json({
        message:"Handling POST requests",
        order_created:order_info
    });
});

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).json({
        id:id,
        message:`Here's your ID ${id}`
    })
});

router.patch('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling PATCH requests"
    });
});

router.delete('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling DELETE requests"
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET requests"
    });
});

router.post('/',(req,res,next)=>{
    const products_info = {
        products_name : req.body.products_name,
        products_price : req.body.products_price
    };
    console.log("products created:",products_info);
    res.status(201).json({
        message:"Handling POST requests",
        products_created:products_info
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

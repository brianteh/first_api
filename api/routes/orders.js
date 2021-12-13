const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Order = require('../models/order');
const Product = require('../models/product');


router.get('/',(req,res,next)=>{
    Order
        .find()
        .select('-__v')
        .exec()
        .then((docs)=>{
            res.status(200).json({

                count:docs.length,
                order: docs.map((doc)=>{
                    return {
                        _id: doc._id,
                        product_id: doc.product_id,
                        quantity: doc.quantity,
                        request:{
                            type: "GET",
                            url: "*/orders/"+doc._id
                        }
                    }
                }),
            });
        }).catch((err)=>{
            console.log('Order fetching failed!');
            res.status(500).json({
                error:err
            })
        });
});

router.post('/:product_id',(req,res,next)=>{
    // set up order
    const order =  new Order({
        _id: mongoose.Types.ObjectId(),
        product_id: req.body.product_id || req.params.product_id,
        quantity: req.body.quantity
    });
    let quant = req.body.quantity;

    if(quant === undefined){
        quant = 1;
    }

    // check if product_id exists
    Product.findById(req.params.product_id || req.body.product_id)
        .exec()
        .then(result=>{
            return order.save();
        })
        .then((result)=>{
            console.log(`Order with id : ${req.body.product_id || req.params.product_id} of quantity ${quant} is created!`);
            res.status(201).json({
                message: "Order created!",
                order_created: result,
                request:{
                    type: "GET",
                    url: "*/orders/"+result._id
                }
            });
        })
        .catch(err=>{
            console.log('Order failed');
            res.status(404).json({
                message:"Product not found",
                error:err
            });
        });
    

   
});

router.get('/:order_id',(req,res,next)=>{
    const id = req.params.order_id;
    Order.findById(id)
        .select('-__v')
        .exec()
        .then(doc=>{
            res.status(200).json({
                _id: doc._id,
                product_id: doc.product_id,
                quantity: doc.quantity,
                request:{
                    message:"GET all orders",
                    type: "GET",
                    url: "*/orders/"
                }
            });
        })
});

router.patch('/:order_id',(req,res,next)=>{
    const id = req.params.order_id;
    // check if product exists
    Product.findById(req.body.product_id)
    .exec()
    .then(result=>{
        return Order.findByIdAndUpdate(id,{$set:req.body},{new:true})//Order.update({_id:id},{$set:update_info})
        .exec();
    })
    .then(result=>{
        console.log(`Order with id : {${id}} updated!`);
        res.status(200).json({
            message:"Order with id {"+id+"} updated!",
            request:{
                type: "GET",
                url: "*/orders/"+id
            }
        });
    })
    .catch(err=>{
        res.status(404).json({
            message:"Product not found",
            error:err
        });
    });
    
});

router.delete('/:order_id',(req,res,next)=>{
    const id = req.params.order_id;
    Order.deleteOne({_id:id})
    .exec()
    .then(result=>{
        console.log(`Order with id {${id}} deleted!`);
        res.status(200).json({
            message:"Order with id {"+id+"} deleted",
            request:{
                type:"POST",
                url:"*/orders/"
            },
            body:{
                product_id:"ObejctId",
                quantity:"Number"
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;
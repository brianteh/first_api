const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest:' uploads/'})


const { request } = require('../../app');
const Product = require('../models/product');

//select *
router.get('/',(req,res,next)=>{
    //find all
    Product.find()
        .select('products_name products_price _id'/*"-__v"*/)
        .exec()
        .then(docs=>{
            console.log("All files are fetched");
            const response = {
                count: docs.length,
                products: docs.map(doc=>{
                    return {
                        _id: doc._id,
                        products_name: doc.products_name,
                        products_price: doc.products_price,
                        request:{
                            type:"GET",
                            url:"*/products/"+doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
    
});

//insert into
router.post('/',(req,res,next)=>{
    const products_info = {
        products_name : req.body.products_name,
        products_price : req.body.products_price
    };

    //mongoose Schema Object from product.js
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        products_name: req.body.products_name,
        products_price: req.body.products_price
    });
    
    product
        .save()
        .then((result)=>{
            res.status(201).json({
                message:"Product created",
                products_created:{
                    _id: result._id,
                    products_name: result.products_name,
                    products_price:result.products_price,
                    request:{
                        type:"GET",
                        url:"*/products/"+result._id
                    }
                }
            });
            console.log("products created:",products_info);
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({error:err});
        });
    
    
    
   
});

//select
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;

    Product.findById(id)
        .select('_id products_name products_price')
        .exec() 
        .then(doc=>{
            console.log("Product with id {"+doc._id+"} fetched");
            if(doc){
                res.status(200).json({
                    product:doc,
                    request:{
                        type:"GET",
                        description:"GET ALL",
                        url:"*/products/"
                    }
                });
            }else{
                res.status(404).json({message:`Product id : ${id} does not exists`});
            }
            
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });


    
});

//update
router.patch('/:id',(req,res,next)=>{
    const id =req.params.id;
    /*const update_info = {};
    for(const info of req.body){
        update_info[info.key] = info.value; 
    }*/
    Product.findByIdAndUpdate(id,{$set:req.body},{new:true})//Product.update({_id:id},{$set:update_info})
    .exec()
    .then(result=>{
        console.log(`Product with id : {${id}} updated!`);
        res.status(200).json({
            message:"Product with id {"+id+"} updated!",
            request:{
                type:"GET",
                url:"*/products/"+id
            }
        });
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
});

//delete
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        console.log(`Product with id {${id}} deleted!`);
        res.status(200).json({
            message:"Product with id {"+id+"} deleted",
            request:{
                type:"POST",
                url:"*/products/"
            },
            body:{
                products_name:"String",
                products_price:"Number"
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
  
});

/*Flow of mongoose query
SchemaModel.find().exec().then().catch();*/

module.exports = router;

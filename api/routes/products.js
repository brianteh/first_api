const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Product = require('../models/product');

//select *
router.get('/',(req,res,next)=>{
    //find all
    Product.find()
        .exec()
        .then(docs=>{
            console.log("All files are fetched");
            res.status(200).json(docs);
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
            console.log(result);
            res.status(201).json({
                message:"Handling POST requests",
                products_created:products_info
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
        .exec() 
        .then(doc=>{
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
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
        console.log(`Updated product with id : ${id}`);
        res.status(200).json(result);
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
        console.log(`Product with id ${id} has been deleted!`);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
  
});

/*Flow of mongoose query
SchemaModel.find().exec().then().catch();*/

module.exports = router;

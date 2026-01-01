const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model")
const productModel = require("../models/product-model")

router.post("/create", async (req, res)=>{
    let owners = await ownerModel.find();
    if(owners.length > 0){
        res.status(503).send("Permission error!!")
    }
    else{
        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner);
    }
});


router.get("/addproduct", (req, res)=>{
    let success = req.flash("success")
    res.render("createproduct", {success})
})

router.get("/allproduct", async (req, res)=>{
    let products = await productModel.find()
    res.render("allproduct", {products})
})

module.exports = router;


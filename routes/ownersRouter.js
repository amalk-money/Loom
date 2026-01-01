const express = require("express");
const router = express.Router();

const productModel = require("../models/product-model")

const {createAdmin, loginAdmin, logoutAdmin} = require("../controllers/authContriller-admin")

router.get("/", (req, res) => {
    let msg = req.flash("msg")
    res.render("admin-index", {msg})
})

router.post("/login", loginAdmin)

router.post("/create", createAdmin);

router.get("/logout", logoutAdmin);

router.get("/addproduct", (req, res) => {
    let success = req.flash("Product Added")
    res.render("createproduct", { success })
})

router.get("/allproduct", async (req, res) => {
    let products = await productModel.find()
    res.render("allproduct", { products })
})

module.exports = router;


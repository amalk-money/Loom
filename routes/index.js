const express = require("express");
const isLoggenIn = require("../middlewares/isLoggedIn");
const router = express.Router();

const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    let error = req.flash("error")
    res.render("index", { error })
})

router.get("/shop", isLoggenIn, async (req, res) => {
    let products = await productModel.find()

    let success = req.flash("success")
    res.render("shop", { products, success })
})

router.get("/addtocart/:productid", isLoggenIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.productid)
    await user.save()

    req.flash("success", "Product Added")
    res.redirect("/shop")
})

router.get("/cart", isLoggenIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart")

    const subTotal = (user.cart.reduce((sum, item) => sum + Number(item.price), 0)).toFixed(2);

    res.render("cart", { user, subTotal })
})

router.get("/buy/:subTotal", isLoggenIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart")

    user.orders.push({
        items: user.cart,
        price: req.params.subTotal,
        date: new Date(),
    });
    user.cart = [];
    await user.save();

    req.flash("success", "Your order has been placed. Thanks for shopping❤️")
    res.redirect("/shop")
})

router.get("/myaccount", isLoggenIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("orders.items")
    res.render("myaccount", { user })
})

router.get("/test", (req, res) => {
    res.render("test", { liked: false })
})

module.exports = router;

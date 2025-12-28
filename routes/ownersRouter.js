const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Hi, This is Owners route")
});

module.exports = router;


const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Hi, This is Products route")
});

module.exports = router;


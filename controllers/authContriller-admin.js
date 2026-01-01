const ownerModel = require("../models/owner-model")

const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.createAdmin = async function (req, res) {
    try {

        let owners = await ownerModel.find();

        if (owners.length > 0) {
            req.flash("msg", "Admin already exists")
            res.redirect("/owners/")
        }
        else {
            let { fullname, email, password } = req.body;

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        req.flash("msg", err.message);
                    }

                    let createdOwner = await ownerModel.create({
                        fullname, email, password: hash
                    });
                    req.flash("msg", "Admin Account Created")
                    res.redirect("/owners/")
                })
            })
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.loginAdmin = async function (req, res) {
    try {
        let {email, password} = req.body;
        
                let owner = await ownerModel.findOne({email: email});
                if(!owner){
                    req.flash("msg", "Incorrect login credentials")
                    res.redirect("/owners/")
                }
                
                bcrypt.compare(password, owner.password, function(err, result){
                    if(result){
                        let token = generateToken(owner);
                        res.cookie("token", token);
                        res.redirect("/owners/allproduct")
                    }
                    else{
                        req.flash("msg", "Incorrect login credentials")
                        res.redirect("/owners/")
                    }
                })
    } catch (error) {
        res.send(error.message);
        
    }
}

module.exports.logoutAdmin = (req, res)=>{
    res.cookie("token", "");
    res.redirect("/owners/")
}

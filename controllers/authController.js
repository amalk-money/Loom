const userModel = require("../models/user-model")

const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email: email })

        if (user) {
            req.flash("error", "An account with this email already exists")
            res.redirect("/")
        }

        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        res.send(err.message);
                    }

                    let createdUser = await userModel.create({
                        fullname, email, password: hash
                    });
                    res.redirect("/")
                })
            })
        }
    } catch (error) {
        res.send(error.message)
    }
}


module.exports.loginuser = async function (req, res) {
    try {
        let {email, password} = req.body;

        let user = await userModel.findOne({email: email});
        if(!user){
            req.flash("error", "Incorrect login credentials")
            res.redirect("/")
        }
        
        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop")
            }
            else{
                return res.send("Email or Password is incorrect")
            }
        })


    } catch (error) {
        res.send(error);
        
    }
}

module.exports.logoutuser = (req, res)=>{
    res.cookie("token", "");
    res.redirect("/")
}
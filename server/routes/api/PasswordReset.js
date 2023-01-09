const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Token = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Joi = require("joi")
const passwordComplexity = require('joi-password-complexity');

router.post('/',async(req, res)=>{
    try {
        const emailSchema = Joi.object({
            email: Joi.string().email().required().label("Email")
        });
        const {error} = emailSchema.validate(req.body);
        if(error) {
            return res.status(400).send({message:error.details[0].message});
        }
        let user = await User.findOne({email:req.body.email});
        if(!user) 
        return res.status(404).send({message:"User with given Email is not Exist"});

        let token = await Token.findOne({userId:user._id});
        if(!token){
            token = await new Token({
                userId:user._id,
                token: crypto.randomBytes(32).toString("hex"),

            }).save();
        }

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email,"Password Reset",url);
        return res.status(200).send({message:"Email for Reset Password Sent"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});

    }
})


router.get('/:id/:token',async (req, res) =>{
    try {
        const user  = await User.findOne({_id:req.params.id});
        if(!user)
        return res.status(400).send({message:"Invalid Link"});

        let token = await Token.findOne({userId:user._id,token:req.params.token});
        if(!token)
        return res.status(400).send({message:"Invalid Link"});

        res.status(200).send({message:"Valid URL"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});

    }
})


router.post('/:id/:token',async (req, res) => {
    try{
         const passwordSchema = Joi.object({
            password:passwordComplexity().require().label("Password")
         });
         const {error} = passwordSchema.validate(req.body);
        if(error) 
            return res.status(400).send({message:error.details[0].message});
        
            const user  = await User.findOne({_id:req.params.id});
            if(!user)
            return res.status(400).send({message:"Invalid Link"});
    
            let token = await Token.findOne({userId:user._id,token:req.params.token});
            if(!token)
            return res.status(400).send({message:"Invalid Link"});
    
            if(!user.verified)
            user.verified = true;
            const salt = await bcrypt.getSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password,salt)

            user.password = hashPassword;
            await user.save();
            await token.remove();

            res.status(200).send({message:"Password Reset Successfully"})
        }catch(error) {

    }
})

module.exports = router;
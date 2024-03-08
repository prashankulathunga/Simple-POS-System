const UserSchema = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const {hash} = require("bcrypt");
const salt = 10;
const nodemailer = require('nodemailer');
const register = async (req, resp) => {

    UserSchema.findOne({email: req.body.email}).then(result => {
        if (result == null) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                if (err) {
                    return resp.status(500).json(err);
                }
                const user = new UserSchema({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hash,
                    activeState: true
                });

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'prashan.kulatunge@gmail.com',
                        pass: 'ctws psqc hlsd texp'
                    }
                })

                const mailOption = {
                    from: 'prashan.kulatunge@gmail.com',
                    to: req.body.email,
                    subject: 'Registered Receipt',
                    text: 'You are successfully registered!'
                }

                transporter.sendMail(mailOption, function (error, info) {
                    if (error) {
                        return resp.status(500).json({'error': error});
                    } else {
                        user.save().then(saveResult => {
                            return resp.status(201).json({status: true, 'message': 'registered successfully!'});
                        }).catch(error => {
                            return resp.status(500).json(err);
                        })
                    }
                })
            })
        } else {
            return resp.status(409).json({status: false, message: 'user already exists!'});
        }
    }).catch(error => {
        return resp.status(500).json(error);
    })
}
const login = async (req, resp) => {

    UserSchema.findOne({email:req.body.email}).then(selectedUser=>{
        if (selectedUser == null){
            return resp.status(404).json({status:false, message:'email does not exists!'});
        }else{
            bcrypt.compare(req.body.password, selectedUser.password, function (err, result){
                if (err){
                    return resp.status(500).json(err);
                }
                if (result){
                    const token = jsonWebToken.sign({'email':selectedUser.email}, process.env.SECRET_KEY,{expiresIn: '24h'});
                    resp.setHeader('Authorization', `Bearer ${token}`);
                    return resp.status(201).json(token);
                }else{
                    return resp.status(401).json({status: true, 'message': 'password was wrong!'});
                }
            })
        }

    }).catch(error=>{
        return resp.status(500).json({error:error});
    })
}

module.exports = {
    register,
    login
}


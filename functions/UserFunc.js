import User from '../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtSecretKey = `${process.env.SECRET_KEY}`;

const createUser = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(201).json({message: error.array()[0].msg})
    }
    const {name, email, password, location} = req.body;
    if(!email || !name || !password || !location){
        return res.status(201).json({message: "All fields are mandatory"})
    }
    const finding = await User.findOne({email: email})
    if(finding){
        return res.status(201).json({message: "Email is already registered."})
    }
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            location: location
        }).then(res.status(200).json({ success: true, message: "Registered Successfully" }))
    } catch (error) {
        // console.log(error)
        res.status(400).json({ success: false, message: "Error in Registration." });
    }
}

const loginUser = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(201).json({message: error.array()[0].msg})
    }
    if(!req.body.email || !req.body.password){
        return res.status(201).json({message: "All fields are mandatory"})
    }
    let email = req.body.email
    try {
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(201).json({message: "Incorrect email or password."});
        }
        const pwdComp = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdComp){
            return res.status(201).json({message: "Incorrect email or password."});
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecretKey)
        return res.status(200).json({success: true, message:"Login Successfully", authToken: authToken})
    } catch (error) {
        // console.log(error)
        res.status(400).json({ success: false, message:"Error in login" });
    }
}

export{
    createUser,
    loginUser,
}
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res)=>{
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something Went wrong",
                success: false,
            })
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User Already Exists with this email",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })
        return res.status(201).json({
            message: "User Created Succesfully",
            success: true
        })
    }catch (error) {
        console.log(error)
        
    }
};

export const login = async (req, res)=>{
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something Went Wrong",
                success: false,
            })            
        }
        let user = await User.findOne({email});
        if(!email){
            return res.status(400).json({
                message: "Incorrect user or password",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect user or password",
                success: false,
            })
        }
        if(role!==user.role){
            return res.status(400).json({
                message: "Account Doesn't Exist with the current role",
                success: false,
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id, // Correctly assign the ID
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        
        return res.status(200).cookie('token', token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite: "strict"}).json({
            message: `Welcome Back ${user.fullname}`,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res)=>{
    try {
        return res.status(200).cookie('token', '', {maxAge: 0}).json({
            message: 'Logout Successfully',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res)=>{
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        const userId = req.id;
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User Not found",
                success: false
            })
        }

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skills.split(',');

        await user.save();

        user = {
            _id: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(200).json({
            message: 'Profile Updated sucessfully',
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
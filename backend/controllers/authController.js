import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';




export const register = async (req,res) =>{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: 'please provide all required fields'
        });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'user already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        

        //store in db
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '1h'});

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //1 week
        });

        //sending email
        //to be implemented after some time
        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: 'welcome to sih hackathon',
        //     text: `Hello ${name},\n\nWelcome to our app! We're glad to have you on board.\nYour account has been created successfully with email id: ${email}\n\nBest regards,\nThe Team`
        // }

        res.status(201).json({
            success: true,
            message: 'user registered successfully'
        })

         

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const login = async (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    try {
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'user does not exist'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //1 week
        }).status(200).json({
            success: true,
            message: 'logged in successfully',
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const logout = async (req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        });

        return res.json({
            success: true,
            message: 'logged out successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
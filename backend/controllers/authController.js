import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';


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


        const token = jwt.sign({id: user._id}, process.env.)



    } catch (error) {
        
    }
}
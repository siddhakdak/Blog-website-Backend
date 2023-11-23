import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async(req, res, next) => {
    let users;

    try {
        users = await User.find()
    } catch (error) {
        console.log(error);
    }

    if(!users){
        return res.status(401).json({messageg: 'No user found'});
    }
    return res.status(200).json({users});
}

export const SignUp = async(req, res, next) =>{
    const {name, email, password} = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPass = bcrypt.hashSync(password);
    
    const user = new User({
        name,
        email,
        password: hashedPass,
        blogs:[]
        })
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({user});
}

export const login = async(req, res, next) =>{
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!existingUser){
        return res.status(404).json({message: 'Could not find User by this email'});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(403).json({message: "Invalid Password"})
    }
    return res.status(200).json({message:"Login Successful"});
}

export const deleteUser = async(req, res, next) =>{
    const id = req.params.id;
    let delUser;

    try {
        delUser = await User.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error);
    }

    if(!delUser){
        return res.status(500).json({message:"Unable to delete User"});
    }

    return res.status(200).json({message:"User deleted successfully"});
}
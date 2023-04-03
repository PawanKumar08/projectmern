const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('./errorHandler');
const sendToken = require('./jwtToken');
const User = require('./userModel');

//register a user 
exports.registerUser = catchAsyncError( async (req, res) =>{
    const {firstName, lastName, email, password} = req.body;
    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    });
    res.status(201).json({
        success: true,
        user,
    })
});

//login User

exports.loginUser = catchAsyncError(async (req, res, next)=>{
    const {email, password} = req.body;

    //checking if user has given password and email both

    if(!email || ! password){
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(isPasswordMatched){
        res.status(200).json({
            success: true,
            user
        })
    }else{
        return next(new ErrorHandler("Invalid email or password", 401));
    }
})

//get All user details
exports.getAllUser = catchAsyncError(async (req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})


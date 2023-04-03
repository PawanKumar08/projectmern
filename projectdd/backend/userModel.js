var bcrypt = require("bcryptjs");
const  mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter First Name"],
        maxLength: [30, "First Name can not Exceed 15 character"],
        minLength: [2,"Fist name should have more than 2 character"]
    },
    lastName : {
        type:String,
        required: [true, "Please Enter Last Name"],
        maxLength: [15, "Last name can not Exceed 15 character"],
        minLength: [2, "Last name should be more than 1 charater"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Email Address"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type: String,
        required: [true, "Please Enter your Password"],
        minLength: [8, "Password should be greater than 8 character"],
        select: false,
    }
});

//Encrypt of Password using bcryptjs module
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password =  bcrypt.hash(this.password, 10);
  });

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    
}

module.exports = mongoose.model("User", userSchema);
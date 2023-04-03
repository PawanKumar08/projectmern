//creating token and saving in cookies

const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();
    //options for cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.status(statusCode).cookies('token', token, options).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken;
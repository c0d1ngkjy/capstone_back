const { User } = require("../models");

module.exports.login = (req, res, next) => {

};

module.exports.logout = (req, res, next) => {

};

module.exports.signup = async (req, res, next) => {
    const {userId, userPassword, userEmail, userPhonenumber} = req.body;
    try {
        const user = await User.create({
            userId: userId,
            userPassword: userPassword,
            userEmail: userEmail,
            userPhonenumber: userPhonenumber,
        });
        res.status(200).json({msg: "가입 성공"});
    }catch (err) {
        console.log(err);
        res.status(404).json({msg: "가입 오류"});
    }
};
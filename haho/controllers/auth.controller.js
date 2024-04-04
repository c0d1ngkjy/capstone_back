const Signup = require("../services/signup.service.js");
const Login = require("../services/login.service.js");
const { generateToken } = require("../middleware/jwt.middleware.js");

module.exports.signup = async (req, res, next) => {
    const { userId, userPassword, userEmail, userPhonenumber } = req.body;

    const signup = new Signup();
    const user = await signup.createUser(userId, userPassword, userEmail, userPhonenumber);

    if (user) res.status(200).json({ msg: "가입 성공", userDate: user }); 
    else return res.status(404).json({ msg: "가입 오류" });
};

module.exports.login = async (req, res, next) => {
    const { userId, userPassword } = req.body;

    const login = new Login();
    const userLogin = await login.selectUser(userId, userPassword);

    if (userLogin) {
        const token = await generateToken(userId);
        return res.status(200).json({ msg: '로그인 되었습니다.', user: userLogin, token: token });
    } else {
        return res.status(200).json({ msg : '아이디나 비밀번호가 잘못되었습니다.' });
    }
};

module.exports.logout = (req, res, next) => {

};
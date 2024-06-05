const Signup = require("../services/signup.service.js");
const Login = require("../services/login.service.js");
const { generateToken } = require("../middleware/jwt.middleware.js");

module.exports.signup = async (req, res, next) => {
    const { id, password, email, phone, school, major} = req.body;

    const signup = new Signup();
    const user = await signup.createUser(id, password, email, phone, school, major);

    if (user) res.status(200).json({ msg: "가입 성공", userData: user }); 
    else return res.status(404).json({ msg: "가입 오류" });
};

module.exports.login = async (req, res, next) => {
    const { id, password } = req.body;

    const login = new Login();
    const userLogin = await login.selectUser(id, password);

    if (userLogin) {
        const token = await generateToken(id);
        return res.status(200).json({ msg: '로그인 되었습니다.', user: userLogin, token: token });
    } else {
        return res.status(200).json({ msg : '아이디나 비밀번호가 잘못되었습니다.' });
    }
};

module.exports.logout = (req, res, next) => {

};
const jwt = require('jsonwebtoken');

const secretKey = 'apple';

module.exports.generateToken = async (id) => {
    try {
        const token = jwt.sign({id: id}, secretKey, { expiresIn: '1h'});
        return token;
    } catch (err) {
        console.log("generate token error ==> ", err);
        return err;
    }
};

module.exports.decodeToken = async (token) => {
    try {
        return jwt.decode(token, { complete: true });
    } catch (err) {
        console.log("decode token error ==> ", err);
        return err;
    }
};

module.exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.Authorization;
        if(!token) {
            return res.status(404).json({msg : '로그인이 필요합니다.'});
        }
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: "토큰 인증에 실패했습니다."});
            }
            req.id = decoded.id;
            next();
        });
    } catch (err) {
        console.log("verify token error ==> ", err);
        return res.status(500).json({msg: '서버 오류'});
    }
};

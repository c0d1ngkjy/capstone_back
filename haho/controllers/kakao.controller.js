const KakaoService = require("../services/kakao.service.js");
const { generateToken } = require("../middleware/jwt.middleware.js");

module.exports.getKakaoUserInfo = async (req, res, next) => {
    const { code } = req.body;
    const kakaoService = new KakaoService();

    try {
        // Step 1: Get access token from Kakao
        const accessToken = await kakaoService.getKakaoAccessToken(code);

        // Step 2: Get user info from Kakao
        const kakaoUserInfo = await kakaoService.getKakaoUserInfo(accessToken);

        // Step 3: Extract relevant information
        const { id, kakao_account: { email, profile: { nickname }, phone_number } } = kakaoUserInfo;

        let user = await kakaoService.findUserById(id);

        if (user) {
            // User already exists, generate token
            const token = await generateToken(user.id);
            return res.status(208).json({
                msg: '로그인 되었습니다.',
                user: user,
                token: token
            });
        }

        // Step 4: Return extracted information
        return res.status(200).json({
            msg: '카카오 사용자 정보를 가져왔습니다.',
            kakaoUserInfo: {
                id: id.toString(),
                email: email || '',
                nickname: nickname || '',
                phone: phone_number || ''
            }
        });
    } catch (error) {
        console.error('Kakao get user info error:', error.message);
        return res.status(404).json({ msg: '카카오 사용자 정보 가져오기 오류', error: error.message });
    }
};

module.exports.register = async (req, res, next) => {
    const { id, name, email, phone, school, major, studentId } = req.body;
    const kakaoService = new KakaoService();

    try {
        // Step 1: Register user in our database
        const userData = { id, name, email, phone, school, major, studentId };
        const user = await kakaoService.registerUser(userData);

        // Step 2: Generate token for the user
        const token = await generateToken(user.id);

        return res.status(200).json({ msg: '회원가입이 완료되었습니다.', user: user, token: token });
    } catch (error) {
        console.error('User registration error:', error.message);
        return res.status(404).json({ msg: '회원가입 오류', error: error.message });
    }
};
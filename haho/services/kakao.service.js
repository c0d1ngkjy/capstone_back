const axios = require('axios');
const { User } = require("../models");

class KakaoService {
    async getKakaoAccessToken(code) {
        const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', 'ea9efa52990ee6b03bb563d97e7a297c'); // Replace with your Kakao client ID
        params.append('redirect_uri', 'https://capstone-37552.web.app/'); // Replace with your Kakao redirect URI
        params.append('code', code);

        try {
            const response = await axios.post(kakaoTokenUrl, params);
            return response.data.access_token;
        } catch (error) {
            console.error('Error fetching Kakao access token:', error.response?.data || error.message);
            throw new Error('Error fetching Kakao access token');
        }
    }

    async getKakaoUserInfo(accessToken) {
        const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

        try {
            const response = await axios.get(kakaoUserInfoUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('카카오 인가코드 만료:', error.response?.data || error.message);
            throw new Error('카카오 인가코드 만료');
        }
    }

    async findUserById(id) {
        try {
            const user = await User.findOne({ where: { id } });
            return user;
        } catch (error) {
            console.error('Error finding user:', error.message);
            throw new Error('Error finding user');
        }
    }

    async registerUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            console.error('Error registering user:', error.message);
            throw new Error('Error registering user');
        }
    }
}

module.exports = KakaoService;
const Clubs = require("../services/club.service.js");
const upload = require('../middleware/multer.middleware');
const { decodeToken } = require("../middleware/jwt.middleware.js");

module.exports.register = async(req, res, next) => {
    const { name, school, location, description} = req.body;
    
    const token = req.headers.Authorization;
    console.log(token);
    const decodedToken = await decodeToken(token);
    console.log(decodedToken);
    const userId = decodedToken.id;

    const clubs = new Clubs();
    const club = await clubs.createClub(name, school, location, description, userId);

    if (club) res.status(200).json({ msg: "동아리 등록", clubData: club });
    else return res.status(404).json({ msg:"등록 오류" });
};

module.exports.findAll = async(req, res, next) => {

    const clubs = new Clubs();
    const findAll = await clubs.findClub();

    if (findAll) res.status(200).json({ msg: "모든 동아리 조회", findAllData: findAll});
    else return res.status(404).json({ msg: "조회할 동아리가 없습니다."});

};

module.exports.addAdmin = async(req, res, next) => {
    const { clubId, userId } = req.body; 

    const clubs = new Clubs();
    const addAdmin = await clubs.addAdmin(clubId, userId);

    if (addAdmin) res.status(200).json({ msg: "관리자 추가", adminList: addAdmin});
    else return res.status(404).json({ msg: "관리자 추가 오류"});

};

module.exports.uploadImageClub = async (req, res, next) => {
    upload.single('profileImage')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ msg: "파일 업로드 오류", error: err.message });
        }
        
        const { clubId } = req.body;
        const clubs = new Clubs();
        const profileImage = req.file.path;

        const updateUser = await clubs.updateImage(clubId, profileImage);

        if (updateUser) res.status(200).json({ msg: "프로필 이미지 업데이트", userData: updateUser });
        else return res.status(404).json({ msg: "프로필 이미지 업데이트 오류" });
    });
};


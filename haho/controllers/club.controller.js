const Clubs = require("../services/club.service.js");
const upload = require('../middleware/multer.middleware');
const { decodeToken } = require("../middleware/jwt.middleware.js");

module.exports.register = async(req, res, next) => {
    const { name, school, location, description} = req.body;
    
    const token = req.headers.authorization;
    const decodedToken = await decodeToken(token);
    const userId = decodedToken.payload.id;
    
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
        const profileImage = `http://3.35.114.100:8080/uploads/${req.file.filename}`;

        const updateClub = await clubs.updateImage(clubId, profileImage);

        if (updateClub) res.status(200).json({ msg: "프로필 이미지 업데이트", clubData: updateClub });
        else return res.status(404).json({ msg: "프로필 이미지 업데이트 오류" });
    });
};

module.exports.findAdmin = async (req, res, next) => {

    const token = req.headers.authorization;
    const decodedToken = await decodeToken(token);
    const userId = decodedToken.payload.id;

    const clubs = new Clubs();
    
    const findAdmin = await clubs.findAdmin(userId);

    if (findAdmin) res.status(200).json({ msg: "관리자 동아리 리스트", clubList: findAdmin});
    else return res.status(404).json({ msg: "관리자 리스트 불러오기 오류"})
};


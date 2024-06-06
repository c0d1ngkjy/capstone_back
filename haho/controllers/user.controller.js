const Users = require("../services/user.service.js");
const upload = require("../middleware/multer.middleware.js");

module.exports.findUser = async(req, res, next) => { 
    const { clubId } = req.body;

    const users = new Users();
    const findUser = await users.findUser(clubId);

    if (findUser) res.status(200).json({ msg: "부원 조회", callData: findUser});
    else return res.status(404).json({ msg: "부원 조회 오류" });

};

//member 컨트롤러로 수정
module.exports.addMember = async(req, res, next) => {
    const { name, email, phone, school, major, studentId, clubId } = req.body;

    const member = new Users();
    const addMember = await member.addUser(name, email, phone, school, major, studentId, clubId);

    if(addMember) res.status(200).json({msg:"부원 클럽 추가", addMember: addMember})
    else return res.status(404).json({ msg:"부원 추가 오류" });
};

module.exports.findMember = async(req, res, next) => {
    const { clubId } = req.body;

    const members = new Users();
    const findMember = await members.findMember(clubId);

    if (findMember) res.status(200).json({ msg: "동아리 멤버 조회", findMember: findMember});
    else return res.status(404).json({ msg: "조회할 멤버가 없습니다."});
};

module.exports.updateUser = async(req, res, next) => {
    const { clubId, userId, updateData } = req.body;

    const users = new Users();
    const updateUser = await users.updateUser(clubId, userId, updateData );

    if (updateUser) res.status(200).json({ msg: "부원 정보 수정", userData: updateUser}) 
    else return res.status(404).json({ msg: "부원 업데이트 오류" });
};

module.exports.deleteUser = async(req, res, next) => {
    const { clubId, userId } = req.body;

    const users = new Users();
    const deleteUser = await users.deleteUser(clubId, userId);

    if (deleteUser) res.status(200).json({ msg: "부원 삭제", userData: deleteUser});
    else return res.status(404).json({ msg: "부원 삭제 오류" });
};

module.exports.uploadImage = async (req, res, next) => {
    upload.single('profileImage')(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ msg: "파일 업로드 오류", error: err.message });
        }
        
        const { userId } = req.body;
        const users = new Users();
        const profileImage = req.file.path;

        const updateUser = await users.updateImage(userId, profileImage);

        if (updateUser) res.status(200).json({ msg: "프로필 이미지 업데이트", userData: updateUser });
        else return res.status(404).json({ msg: "프로필 이미지 업데이트 오류" });
    });
};




const Members = require("../services/user.service.js");

//member 컨트롤러로 수정
module.exports.addMember = async(req, res, next) => {
    const { name, email, phone, school, major, studentId, clubId } = req.body;

    const members = new Members();
    const addMember = await members.addMember(name, email, phone, school, major, studentId, clubId);

    if(addMember) res.status(200).json({msg:"부원 클럽 추가", addMember: addMember})
    else return res.status(404).json({ msg:"부원 추가 오류" });
};

//member 컨트롤러로 수정
module.exports.findMember = async(req, res, next) => {
    const { clubId } = req.body;

    const members = new Members();
    const findMember = await members.findMember(clubId);

    if (findMember) res.status(200).json({ msg: "동아리 멤버 조회", findMember: findMember});
    else return res.status(404).json({ msg: "조회할 멤버가 없습니다."});
};

//member 컨트롤러로 수정
module.exports.updateMember = async(req, res, next) => {
    const { clubId, memberId, updateData } = req.body;

    const members = new Members();
    const updateMember = await members.updateMember(clubId, memberId, updateData );

    if (updateMember) res.status(200).json({ msg: "부원 정보 수정", memberData: updateMember}) 
    else return res.status(404).json({ msg: "부원 업데이트 오류" });
};

//member 컨트롤러로 수정
module.exports.deleteMember = async(req, res, next) => {
    const { clubId, memberId } = req.body;

    const members = new Members();
    const deleteMember = await members.deleteMember(clubId, memberId);

    if (deleteMember) res.status(200).json({ msg: "부원 삭제", memberData: deleteMember});
    else return res.status(404).json({ msg: "부원 삭제 오류" });
};



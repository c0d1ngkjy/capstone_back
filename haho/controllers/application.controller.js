const Applications = require("../services/application.service.js");

module.exports.addApplication = async(req, res, next) => {
    const { title, dateRange, questionList, clubId } = req.body;
    const { from, to } = dateRange;

    const applications = new Applications();
    const application = await applications.addApplication(title, questionList, from, to, clubId);

    if(application) return res.status(200).json({msg : "신청서 생성", applicationData : application})
    else return res.status(500).json({ msg: "신청서 생성 오류" });

};

module.exports.getApplication = async(req, res, next) => {
    const { clubId } = req.body;

    const applications = new Applications();
    const application = await applications.getApplication(clubId);

    if(application) return res.status(200).json({msg : "신청서 가져오기 성공", applicationData : application})
    else return res.status(500).json({ msg: "신청서 가져오기 실패" });

};
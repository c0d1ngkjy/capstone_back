const Applications = require("../services/application.service.js");

module.exports.test = async(req, res, next) => {
    const { title, dateRange, questionList, clubId } = req.body;
    const { from, to } = dateRange;

    const applications = new Applications();
    const application = await applications.addApplication(title, questionList, from, to, clubId);

    if(application) return res.status(200).json({msg : "신청서 생성", applicationData : application})
    else return res.status(500).json({ msg: "신청서 생성 오류" });

};
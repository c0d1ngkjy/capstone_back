const Applications = require("../services/application.service.js");

module.exports.addApplication = async(req, res, next) => {
    const { title, dateRange, interviewDateRange, questionList, clubId } = req.body;
    const { from, to } = dateRange;
    const { from: interviewFrom, to: interviewTo } = interviewDateRange;

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const link = generateRandomString(30);

    console.log(clubId);
    const applications = new Applications();
    const application = await applications.addApplication(title, questionList, from, to, interviewFrom, interviewTo, link, clubId);

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

module.exports.deleteApplication = async(req, res, next) => {
    const { applicationId } = req.body;

    const applications = new Applications();
    const application = await applications.deleteApplication(applicationId);

    if(application) return res.status(200).json({msg : "신청서 삭제", deleteApplication : application})
    else return res.status(500).json({ msg: "신청서 삭제실패" });

};

module.exports.getApplicationFromLink = async(req, res, next) => {
    const { link } = req.body;

    const applications = new Applications();
    const application = await applications.getApplicationFromLink(link);
    
    if (application) return res.status(200).json({ msg: "신청서 불러오기", applicationData: application})
    else return res.status(500).json({ msg: "신청서 불러오기 오류" });
};

module.exports.addAnswer = async(req, res, next) => {
    const { answerList, interviewDate, application_id } = req.body;

    const answers = new Applications();
    const answer = await answers.addAnswer(answerList, interviewDate, application_id);

    if (answer) return res.status(200).json({ msg: "답변 데이터", answerData: answer})
    else return res.status(500).json({ msg: "답변 오류" });
};

module.exports.getAnswer = async(req, res, next) => {
    const { applicationId } = req.body;

    const answers = new Applications();
    const answer = await answers.getAnswer(applicationId);

    if (answer) return res.status(200).json({ msg: "답변 가져오기", answerData: answer})
    else return res.status(500).json({ msg: "답변 가져오기 오류" });
};

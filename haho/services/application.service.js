const { Application, Answer } = require("../models");

class Applications {

    async addApplication(title, questionList, from, to, interviewFrom, interviewTo, link, clubId) {
        try {
            const application = await Application.create({
                title: title,
                questionList: questionList,
                from: from,
                to: to,
                interviewFrom: interviewFrom,
                interviewTo: interviewTo,
                link: link,
                club_id: clubId
            });
            return application;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getApplication(clubId) {
        try {
            const application = await Application.findAll({
                where: { club_id: clubId }
            });
            return application;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    async deleteApplication(applicationId) {
        try {
            const application = await Application.findByPk(applicationId);

            if (!application) return null;

            await application.destroy();
            return application;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    async getApplicationFromLink(link) {
        try{
            const application = await Application.findOne({
                where: {link: link}
            });
            return application;
        } catch (err) {
            return null;
        }
    }

    async addAnswer(answerList, interviewDate, applicationId) {
        try {
            const answer = await Answer.create({
                answerList: [answerList],
                interviewDate: interviewDate,
                application_id: applicationId
            });
            return answer;
        } catch (err) {
            return null;
        }
    }

    async getAnswer(applicationId) {
        try{
            const answer = await Answer.findAll({
                where: { application_id: applicationId }
            });
            return answer;
        } catch (err) {
            return null;
        }
    }
    
};

module.exports = Applications;
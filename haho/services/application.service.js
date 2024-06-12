const { Application } = require("../models");

class Applications {

    async addApplication(title, questionList, from, to, link, clubId) {
        try {
            const application = await Application.create({
                title: title,
                questionList: questionList,
                from: from,
                to: to,
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

    
};

module.exports = Applications;
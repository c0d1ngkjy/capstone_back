const { Application } = require("../models");

class Applications {

    async addApplication(title, questionList, link, from, to, clubId) {
        try {
            const application = await Application.create({
                title, questionList, from, to, link,
                club_id : clubId
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

    
};

module.exports = Applications;
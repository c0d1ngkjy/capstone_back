const { Club } = require("../models");
 
class Clubs {
    
    async createClub(name, school, location, description, userId) {
        try {
            const club = await Club.create({
                name: name,
                school: school,
                location: location,
                description: description,
                admin_list: [userId]
            })
            return club;
        } catch(err) {
            console.log(err);
            return null;
        }
    };

    async findClub() {
        try {
            const club = await Club.findAll();
            return club;
        } catch (err) {
            return null;
        }
    };

    async addAdmin(clubId, userId) {
        try {
            const club = await Club.findByPk(clubId);
            if(!club) return null;

            let adminList = club.adminList || [];
            if(!adminList.includefs(userId)) adminList.push(userId);

            club.admin_list = adminList;
            await club.save();
            return club;
        } catch (err) {
            return null;
        }
    };

    async updateImage(clubId, profileImage) {
        try {
            const club = await Club.findByPk(clubId);

            if (!club) return null;

            club.image = profileImage;

            await club.save();
            return club;
        } catch (err) {
            return null;
        }
    }

    async findAdmin(userId) {
        try {
            const club = await Club.findAll({
                where: {
                    admin_list: userId
                }
            });

            if(!club) return null;

            await club.save();
            return club;
        } catch (err) {
            return null;
        }
    }

};
module.exports = Clubs;
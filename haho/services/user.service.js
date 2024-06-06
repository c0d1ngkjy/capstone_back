const { User, Member} = require("../models");
 
class Users {
    
    async findUser(clubId) {
        try {
            const user = await User.findAll({
                where: {club_id : clubId},
            });
            return user;
        } catch (err) {
            return null;
        }
    }

    async addUser(name, email, phone, school, major, studentId, clubId) {
        try {
            const member = await Member.create({
                name: name,
                email: email,
                phone: phone,
                school: school,
                major: major,
                studentId: studentId,
                club_id: clubId
            })
            return member;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async findMember(clubId) {
        try {
            const member = await Member.findByPk(clubId);
            return member;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async updateUser(clubId, userId, updateData) {
        try {
            const user = await User.findOne({
                where: {
                    id: userId,
                    club_id: clubId
                }
            });

            if(!user) return null;

            await user.update(updateData);
            return user;
        } catch (err) {
            return null;
        }
    }

    async deleteUser(clubId, userId) {
        try {
            const user = await User.findOne({
                where: {
                    id: userId,
                    club_id: clubId
                }
            });

            if (!user) return null;

            await user.destroy();
            return user;
        } catch (err) {
            return null;
        }
    }

    async updateImage(userId, profileImage) {
        try {
            const user = await User.findByPk(userId);

            if (!user) return null;

            user.image = profileImage;

            await user.save();
            return user;
        } catch (err) {
            return null;
        }
    }

};
module.exports = Users;
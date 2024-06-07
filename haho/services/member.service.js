const { User, Member} = require("../models");
 
class Members {
    
    async addMember(name, email, phone, school, major, studentId, clubId) {
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
            const member = await Member.findAll({
                where: { club_id: clubId }
            })
            return member;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async updateMember(clubId, memberId, updateData) {
        try {
            const member = await Member.findOne({
                where: {
                    member_id: memberId,
                    club_id: clubId
                }
            });

            await member.update(updateData);
            return member;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async deleteMember(clubId, memberId) {
        try {
            const member = await Member.findOne({
                where: {
                    member_id: memberId,
                    club_id: clubId
                }
            });

            if (!member) return null;

            await member.destroy();
            return member;
        } catch (err) {
            return null;
        }
    }

};
module.exports = Members;
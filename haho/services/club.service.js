const { Club, User, Sequelize } = require("../models");
 
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
            const user = await User.findByPk(userId);
            user.club_id = club.club_id;
            await user.save();

            //위에 만들어진 클럽의 clubId를 userId 로 찾은 유저테이블 clubid컬럼에 추가
            return club;
        } catch(err) {
            console.log(err);
            return null;
        }
    };

    async getAdminData(clubId) {
        try {
            // Find the club by the provided clubId
            const club = await Club.findByPk(clubId);
            if (!club) return null;  // If club not found, return null
    
            // Extract the adminList from the club
            const adminList = club.admin_list;
            if (!adminList || adminList.length === 0) return [];  // If adminList is empty or null, return an empty array
    
            // Fetch the user data for each userId in the adminList
            const adminDataPromises = adminList.map(async (userId) => {
                const user = await User.findByPk(userId);
                return user ? user.toJSON() : null;
            });
    
            // Wait for all promises to resolve and filter out any null values
            const adminData = (await Promise.all(adminDataPromises)).filter(user => user !== null);
    
            return adminData;
        } catch (err) {
            console.error('Error getting admin data:', err);
            return null;
        }
    }
    

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
            const clubs = await Club.findAll({
                where: Sequelize.literal(`JSON_SEARCH(admin_list, 'one', '${userId}') IS NOT NULL`)
            });
            return clubs;
        } catch (err) {
            console.error('Error finding admin clubs:', err);
            return null;
        }
    }

};
module.exports = Clubs;
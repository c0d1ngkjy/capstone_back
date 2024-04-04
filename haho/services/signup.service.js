const { User } = require("../models");

class Signup {

    async createUser(userId, userPassword, userEmail, userPhonenumber) {
        try {
            const user = await User.create({
                userId: userId,
                userPassword: userPassword,
                userEmail: userEmail,
                userPhonenumber: userPhonenumber,
            })
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

};

module.exports = Signup;
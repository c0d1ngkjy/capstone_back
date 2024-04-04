const { User } = require("../models");

class Login {
    
    async selectUser(userId, userPassword) {
        try {
            const userLogin = await User.findOne({
                where: { userId, userPassword } 
            });
            if (userLogin === null) {
                return null;
            }
            return userLogin;
        } catch (err) {
            console.log(err);
            return 0;
        }
    };

};

module.exports = Login;
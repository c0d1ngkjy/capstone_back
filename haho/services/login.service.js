const { User } = require("../models");

class Login {
    
    async selectUser(id, password) {
        try {
            const userLogin = await User.findOne({
                where: { id, password } 
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
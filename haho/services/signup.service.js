const { User } = require("../models");

class Signup {

    async createUser(id, password, email, phone, school, major) {
        try {
            const user = await User.create({
                id: id,
                password: password,
                email: email,
                phone: phone,
                school: school,
                major: major
            })
            return user;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

};

module.exports = Signup;
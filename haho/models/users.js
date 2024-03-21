module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("user", {
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        userPassword: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        userPhonenumber: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
    }, {
        underscored: true, 
        freezeTableName: true, // 테이블의 이름을 복수로 설정하지 않음
        tableName: "users" // 테이블 이름 설정
    });
    return User
};
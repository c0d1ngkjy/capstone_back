module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("user", {
        id: {
            type: DataTypes.STRING(15),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        school: {
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        major: {
            type: DataTypes.STRING(60),
            allowNull:false,
        },
        club_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'club',
                key: 'club_id'
            }
        }, 
        image: {
            type: DataTypes.STRING(500),
            allowNull: true,
        }, 
        studentId: {
            type: DataTypes.INTEGER(50),
            allowNull: true,
        }
    }, {
        underscored: true, 
        freezeTableName: true, // 테이블의 이름을 복수로 설정하지 않음
        tableName: "user", // 테이블 이름 설정
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return User;
    
};
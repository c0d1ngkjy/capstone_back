module.exports = function(sequelize, DataTypes) {
    let Club = sequelize.define("club", {
        club_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        school: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        admin_list: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(1500),
            allowNull: true,
        }
        
    }, {
        undefined: true,
        freezeTableName: true,
        tableName: "club",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Club;
};
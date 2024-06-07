module.exports = function(sequelize, DataTypes) {
    let Calendar = sequelize.define("calendar", {
        calendar_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        writer: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        club_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'club',
                key: 'club_id'
            }
        }, 
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "calendar",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })
    return Calendar;
} 
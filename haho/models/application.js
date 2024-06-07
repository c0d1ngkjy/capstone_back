module.exports = function(sequelize, DataTypes) {
    let Application = sequelize.define("application", {
        application_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        from: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        to: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        questionList: {
            type: DataTypes.JSON,
            allowNull: false,
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
        tableName: "application",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
    
    return Application;
} 

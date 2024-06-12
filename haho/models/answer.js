module.exports = function(sequelize, DataTypes) {
    let Answer = sequelize.define("answer", {
        answer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        answerList: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        interviewDate: {
            type: DataTypes.STRING,
            allowNull: fasle,
        },
        application_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'application',
                key: 'application_id'
            }
        }, 
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "answer",
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
    
    return Answer;
} 

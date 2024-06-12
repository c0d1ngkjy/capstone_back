module.exports = function(sequelize, DataTypes) {
    let Receipt = sequelize.define("receipt", {
        receipt_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        history: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        receiptDate: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING(50),
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
    }, {
        underscored: true, 
        freezeTableName: true, // 테이블의 이름을 복수로 설정하지 않음
        tableName: "receipt", // 테이블 이름 설정
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });

    return Receipt;
    
};
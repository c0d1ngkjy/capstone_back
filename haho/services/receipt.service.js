const { Receipt } = require("../models");
 
class Members {
    
    async addReceipt(type, history, description, receiptDate, amount, clubId) {
        try {
            const receipt = await Receipt.create({
                type,
                history,
                description,
                receiptDate,
                amount,
                club_id: clubId
            })
            return receipt;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getReceipt(clubId) {
        try {
            const receipt = await Receipt.findAll({
                where: { club_id: clubId }
            })
            return receipt;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async deleteReceipt(receiptId, clubId) {
        try {
            const receipt = await Receipt.findOne({
                where: {
                    receipt_id: receiptId,
                    club_id: clubId
                }
            });

            if (!receipt) return null;

            await receipt.destroy();
            return receipt;
        } catch (err) {
            return null;
        }
    }

};
module.exports = Members;
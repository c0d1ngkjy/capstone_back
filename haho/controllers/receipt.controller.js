const Receipts = require("../services/receipt.service.js");

module.exports.addReceipt = async (req, res, next) => {
    const { type, history, description, receiptDate, amount, clubId } = req.body;

    const receipts = new Receipts();
    const receipt = await receipts.addReceipt(type, history, description, receiptDate, amount, clubId);

    if (receipt) return res.status(200).json({ msg: "영수증 데이터", receiptData: receipt });
    else return res.status(404).json({ msg: "영수증 오류" });
};

module.exports.getReceipt = async (req, res, next) => {
    const { clubId } = req.body;

    const receipts = new Receipts();
    const receipt = await receipts.getReceipt(clubId);

    if (receipt) return res.status(200).json({ msg: "영수증 데이터", receiptData: receipt });
    else return res.status(404).json({ msg: "영수증 오류" });
};

module.exports.deleteReceipt = async (req, res, next) => {
    const { receiptId, clubId } = req.body;

    const receipts = new Receipts();
    const receipt = await receipts.deleteReceipt(receiptId, clubId);

    if (receipt) return res.status(200).json({ msg: "영수증 데이터", receiptData: receipt });
    else return res.status(404).json({ msg: "영수증 오류" });
};

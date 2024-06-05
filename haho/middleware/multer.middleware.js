const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 파일이 저장될 경로
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // 파일 이름 설정
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // 허용되는 파일 형식
    } else {
        cb(null, false); // 허용되지 않는 파일 형식
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB 제한
    },
    fileFilter: fileFilter
});

module.exports = upload;
const express = require('express');
const bodyParser = require("body-parser");
const models = require("./models/index.js");
const cors = require("cors");
const path = require('path');

const app = express();

const indexRouter = require('./routes/index.route.js');
const authRouter = require('./routes/auth.route.js');
const clubRouter = require('./routes/club.route.js');
const userRouter = require('./routes/user.route.js');
const calendarRouter = require('./routes/calendar.route.js');
const memberRouter = require('./routes/member.route.js');
const applicationRouter = require('./routes/member.route.js');

const port = 8080;

models.sequelize.sync().then( () => {
    console.log("DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/club', clubRouter);
app.use('/user', userRouter);
app.use('/calendar', calendarRouter);
app.use('/member', memberRouter);
app.use('/application', applicationRouter);

app.listen(port, () => {
    console.log(`${port} 포트에서 실행 중입니다.`);
});
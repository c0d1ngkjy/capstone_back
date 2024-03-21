const express = require('express');
const bodyParser = require("body-parser");
const models = require("./models/index.js");

const app = express();


const indexRouter = require('./routes/index.route.js');
const authRouter = require('./routes/auth.route.js');

const port = 8000;

models.sequelize.sync().then( () => {
    console.log("DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`${port} 포트에서 실행 중입니다.`);
});

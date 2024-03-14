const express = require('express');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const port = 3000;

const config = {
    host:'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'frist'
};

const sessionStore = new MySQLStore(config);

app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        secret: "black",
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    })
);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`${port} 포트에서 실행 중입니다.`);
});

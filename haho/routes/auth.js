const express = require('express');
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register.html');    
});

router.post('/register', (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const age = req.body.age;

    connection.query('INSERT INTO users (id, name, age, password) values (?,?,?,?)', [id, name, age, pw], (error, result) => {
        if (error) res.send('<h1>다시 입력해주세요.</h1>');
        if (result) res.send(`<h1>${name}님 회원가입 완료되었습니다.</h1>`);
    })
});

router.get('', (req, res) => {
    res.render('login.html');
});

router.post('/login', (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    connection.query('SELECT * FROM users WHERE id = ? and password = ?', [id, pw], (error, result) => {
        if (result.length > 0) res.send('<h1>로그인 되었습니다.</h1>');
        if (error) res.send('<h1>잘못 입력되거나 없는 아이디 입니다.</h1>');
    })
});

module.exports = router;
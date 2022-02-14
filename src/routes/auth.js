if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const database = require('../database');
const db = database();

router.get('/', (req, res) => {
    res.redirect('login');
});

router.get('/register', (req, res) => {
    res.render('register.ejs', {message: ""})
});

router.get('/login', (req, res) => {
    res.render('login.ejs')
});

router.post('/register', (req, res) => {

    const {firstName, lastName, email, password} = req.body;

    let sqlEmail = `SELECT * FROM users WHERE email = '${email}'`;

    db.query(sqlEmail, (error, result) => {
        
        if(!result.length)
        {
            bcrypt.hash(password, 10).then((hash) =>
            {
                let sql = `INSERT INTO users (first_name, last_name, email, password) VALUES('${firstName}', '${lastName}',
                 '${email}', '${hash}');`;
        
                 db.query(sql, (error, result) => {
                    if(error) throw error;
        
                    res.redirect('/auth/login');
                }); 
            });
            return;
        }else{
            res.render('register.ejs', {message: "Email already registed"})
            return;
        }
   });


});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM users WHERE email = '${email}'`;

     db.query(sql, (error, result) => {
        if(error) throw error;

        if(!result.length)
        {
            res.json({message: "User doesn't exists."})
            return;
        }else{
            bcrypt.compare(password, result[0]['password']).then((match) =>
            {
                if(!match)
                {
                    res.json({message: "Wrong password."})
                    return;
                }else{
                    const acessToken = sign({
                        firstName: result[0].first_name, 
                        lastName: result[0].last_name,
                        userId: result[0].id  
                    }, process.env.TOKEN_SECRETE);

                    res.json({acessToken: acessToken});
                    return;
                }
            });

            return;
        }
    });

  
});

module.exports = router;
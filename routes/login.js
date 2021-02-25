const router = require('express').Router();
const Login = require("../model/Login").Login;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pages = require('../controller/pagesCtrl');
const {notAuth} = require('../middlewares/auth');

router.get('/', notAuth, (req, res) => {
    pages.login.options.error = null;
    res.render(pages.login.view, pages.login.options);
});

router.post('/', (req, res) => {
    Login.find(req.body.username, (login) =>{
        if (!login) {
            pages.login.options.error = 'Incorrect email';
            return res.status(404).render(pages.login.view, pages.login.options);
        }
        try {
            bcrypt.compare(req.body.password, login.Password).then(
                (valid) => {
                    if(!valid) {
                        pages.login.options.error = 'Incorrect password';
                        return res.status(401).render(pages.login.view, pages.login.options);
                    }
                    try {
                        const token = jwt.sign({id: login.ID, role: login.Role}, process.env.TOKEN_SECRET);
                        localStorage.setItem('auth-token', token);
                        res.redirect('/redirect');
                    } catch (err) {return res.redirect('/lost')}
                }
            )
        } catch (err) {return res.redirect('/lost')}
    });
});

module.exports = router;
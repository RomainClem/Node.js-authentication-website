const router = require('express').Router();
const {isAdmin} = require('../middlewares/auth');
const pages = require('../controller/pagesCtrl');
const Admin = require("../model/Admin").Admin;
const Login = require("../model/Login").Login;
const User = require("../model/User").User;
const emailValidation = require('../middlewares/dataValidation');

router.get('/', isAdmin, (req, res) => {
     const users = Admin.all(rows => {
        pages.admin.options.error = null;
        pages.admin.options.users = rows;
        res.render(pages.admin.view, pages.admin.options);
    });
});

router.post('/register', isAdmin, emailValidation, (req, res) => {
    const userInfo = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,
        password: req.body.password, role: req.body.role};
    User.create(userInfo, user => {
        userInfo.id = user.lastID;
        Login.create(userInfo, err => {
            return res.redirect('/admin');
        })
    })
});

router.post('/edit/:id', isAdmin, (req, res) => {
    const updateInfo = {id: req.params.id,  password: req.body.password, role: req.body.role};
    Login.update(updateInfo, err => {
        res.redirect('/admin');
    })
});

router.post('/delete/:id', isAdmin, (req, res) => {
    const id = req.params.id;
    Login.delete(id, err => {
        User.delete(id, err => {
            res.redirect('/admin');
        })
    })

});

module.exports = router;
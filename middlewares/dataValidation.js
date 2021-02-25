const Login = require("../model/Login").Login;
const pages = require('../controller/pagesCtrl');
const Admin = require("../model/Admin").Admin;

const dataValidation = (req, res, next) => {
    Login.find(req.body.email, (login) => {
        if (!login) {
            next();
        }
        else {
            const users = Admin.all(rows => {
                pages.admin.options.error = `Login ${req.body.email} already exist!`;
                pages.admin.options.users = rows;
                return res.status(401).render(pages.admin.view, pages.admin.options);
            });
        }
    })
}

module.exports = dataValidation;
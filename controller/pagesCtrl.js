module.exports = {
    "home": {
        view: '../views/pages/index',
        options: {nav: 'Home'}
    },
    "about": {
        view: '../views/pages/about',
        options: {nav: 'About'}
    },
    "contact": {
        view: '../views/pages/contact',
        options: {nav: 'Contact Info'}
    },
    "help": {
        view: '../views/pages/help',
        options: {nav: 'Help'}
    },
    "login": {
        view: '../views/pages/login',
        options: {nav: 'Log in', error: null}
    },
    "admin": {
        view: '../views/pages/admin',
        options: {nav: 'Admin', error: null}
    },
    "lost": {
        view: '../views/pages/lost',
        options: {nav: "Wrong Wae", errorMsg: 'Wrong wae my brotha!'}
    }
}
const jwt = require('jsonwebtoken');

const setUser = (req, res, next) => {
    const token = localStorage.getItem('auth-token');
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        if (token) {
            const decoded = jwt.decode(token);
            req.user = decoded;
            res.locals.isAuth = true;
            res.locals.isAdmin = decoded.role === 'Admin';
            next();
        } else {
            res.locals.isAdmin = false;
            res.locals.isAuth = false;
            next();
        }
    } catch (err) {
        localStorage.clear();
        res.locals.isAdmin = false;
        res.locals.isAuth = false;
        next();
    }
}

module.exports = setUser;
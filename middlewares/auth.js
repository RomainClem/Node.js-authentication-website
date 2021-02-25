const notAuth = (req, res, next) => {
    if (res.locals.isAuth)
        return res.status(401).render('../views/pages/lost', {nav: "Wrong Wae", errorMsg: "You are already logged in!"});
    next();
};

const auth = (req, res, next) => {
    if (!res.locals.isAuth)
        return res.status(401).render('../views/pages/lost', {nav: "Wrong Wae", errorMsg: "You are not logged in!"});
    next();
};

const isAdmin = (req, res, next) => {
    if(!res.locals.isAdmin){
        return res.status(401).render('../views/pages/lost', {nav: "Wrong Wae", errorMsg: "You are not an admin!"});
    }
    next();
};

module.exports ={
    notAuth,
    auth,
    isAdmin
}
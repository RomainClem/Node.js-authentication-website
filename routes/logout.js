const router = require('express').Router();

router.post('/', (req, res) => {
    localStorage.clear();
    res.redirect('/');
});

module.exports = router;
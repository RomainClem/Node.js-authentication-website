const router = require('express').Router();
const redirect = require("../controller/setRedirect");
const {auth} = require('../middlewares/auth');
const pages = require('../controller/pagesCtrl');

/* GET home page.*/
router.get('/', (req, res) => {
  res.render(pages.home.view, pages.home.options);
});

router.get('/about', (req, res) => {
  res.render(pages.about.view, pages.about.options);
});

router.get('/contact', (req, res) => {
  res.render(pages.contact.view, pages.contact.options);
});

router.get('/help', (req, res) => {
  res.render(pages.help.view, pages.help.options);
});

router.get('/redirect', auth, (req, res) => {
  if (res.locals.isAdmin)
    res.redirect('/admin');
  else
    res.status(302).render(pages[redirect(req.user.role)].view, pages[redirect(req.user.role)].options);
});

router.get('/lost', (req, res) => {
  res.render(pages.lost.view, pages.lost.options);
});


module.exports = router;

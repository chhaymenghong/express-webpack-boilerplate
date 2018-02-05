const router = require('express').Router();

// middleware that is specific to this router
// we can add common logic to this all the routes this router handle through here
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next()
});

// handle /users/ route
router.get('/', function (req, res) {
    res.json([
        {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
        {"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@yahoo.com"},
        {"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@hotmail.com"}
    ]);
});

// handle /users/about
router.get('/about', function (req, res) {
    res.json([
        {"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"}
    ]);
});


module.exports = router;

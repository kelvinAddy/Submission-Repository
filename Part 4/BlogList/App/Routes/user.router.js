const router = require('express').Router();
const user_controller = require('../Controllers/user.controller');

router.get('/', user_controller.get);
router.post('/', user_controller.post);

module.exports = router;

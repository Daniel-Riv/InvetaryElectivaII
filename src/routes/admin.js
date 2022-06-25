const {Router} = require('express');
const { unlockUser,unlocked } = require('../controller/admin');
const { validator } = require('../middleware/valdiator');
const { validateRole } = require('../middleware/validator-admin');

const router = Router();

router.get('/unlock-user',[validator,validateRole],unlocked);
router.get('/userBlock',[validator,validateRole],unlockUser);

module.exports= router;
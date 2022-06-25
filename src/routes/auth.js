const {Router} = require('express');
const { check } = require('express-validator');
const {signUp, signIn, changeOfPassword, forgotPassword, validationToken } = require('../controller/auth');
const { validateResult } = require('../helper/validation');
const { validator } = require('../middleware/valdiator');


const router = Router();

router.post('/signUp', signUp );
router.post('/signIn', signIn );
router.put('/firsLogin/:email',[check('newPassword').isStrongPassword({
        minLowercase: 1,
        minUppercase: 1, 
        minNumbers: 1, 
        minSpecialChar: 1,
}).withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),validateResult],changeOfPassword);
router.post('/forgotpassword',forgotPassword);
router.get('/validationToken',validator,validationToken)

module.exports= router;
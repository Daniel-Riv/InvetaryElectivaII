const  {validationResult}= require('express-validator');

const validateResult = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                error
            })
        }
    next();
}

module.exports = { validateResult }
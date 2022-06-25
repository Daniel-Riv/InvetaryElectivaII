const User = require('../models/user')

const validateRole = async (request, response, next) => {
    const { id } = request;

    const user = await User.findOne({ _id: id });
    if (user.role === 'USER') {
        return response.status(401).send({
            ok: false,
            error: 'The user not permission of admin',
        });
    }

    next();
}

module.exports = {
    validateRole,
}
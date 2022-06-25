const jwt = require('jsonwebtoken');

const generateJWT = (id, name, lastName, email) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name, lastName, email };
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '5m'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('the token cant generate ');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}
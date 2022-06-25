const {generate} = require('generate-password');

const password = generate({
    length: 15,
    numbers:true,
    symbols: true,
    strict: true
});

module.exports = password;

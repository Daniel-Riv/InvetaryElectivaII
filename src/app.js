const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./database/connect-database');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//settings
app.set('port', process.env.PORT || 5000);

//routes
app.use('/api/user',require('./routes/auth'));
app.use('/api/product',require('./routes/product'));
app.use('/api/admin',require('./routes/admin'));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});  
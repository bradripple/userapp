const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const fs = require('fs');

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
// import models here
const { User } = require('./models');


app.get('/', (req, res) => {
    res.send('Welcome to my userapp');
});

app.get('/users', async (req, res) => {
    try {
        const allUsers = await User.findAll({}); // array
        // console.log(allUsers);
        const parsedUsers = allUsers.map(u => u.toJSON());
        console.log(parsedUsers);

        res.render('users/index', { users: parsedUsers});
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});

const express = require('express');
const knex = require('./knex');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8888;
const app = express();
const methodOverride = require('method-override');
const expressSession = require('express-session');
const auth = require('./routes/auth/auth_routes');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(expressSession({ secret: 'louis is cool', cookie: { maxAge: 60000 }}))

app.use(auth);

app.use((req, res, next) => {
  // Verify if a user is currently logged in or not.
  if (req.session.user) {
    // User is logged in, proceed.
    next();
  } else {
    // User is not logged in, redirect to login page.
    res.redirect('/auth/login');
  }
})

const shops = require('./routes/shops/shops_routes');
const donuts = require('./routes/donuts/donuts_routes');
const employees = require('./routes/employees/employees_routes');
const users = require('./routes/users/users_routes');


app.use('/shops', shops);
app.use('/donuts', donuts);
app.use('/employees', employees)
app.use(users);

app.get('/', (req, res)=>{
  res.render('home');
});



app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});


module.exports = app;

const path = require('path');
const express = require('express')
const ejsLayouts = require('express-ejs-layouts');

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', 'layouts/main');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', {pageTitle: 'Home'})
})

app.get('/catalog', (req, res) => {
  res.render('books/index', {pageTitle: 'Catalog'})
})

app.get('/login', (req, res) => {
  res.render('users/login', {pageTitle: 'Login'})
})

app.get('/register', (req, res) => {
  res.render('users/register', {pageTitle: 'Register'})
})

app.use((req, res, next) => {
  res.render('errors/404', { pageTitle: 'Page Not Found' });
});

app.listen(port, () => {
  console.log(`ALMS app listening on port ${port}`)
})

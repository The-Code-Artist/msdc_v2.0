require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3300;

// Middleware configuration.
app.use(layouts);
app.use(express.json());
app.use(express.static('public'));
app.use('/css', express.static(`${__dirname}/public/css`));
app.use('/img', express.static(`${__dirname}/public/img`));
app.use('/js', express.static(`${__dirname}/public/js`));

// Template engine configuration.
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.set('layout', `${__dirname}/src/views/layouts/layout`);

// Routes.
const contactRoute = require('./src/routes/contact');
const portfolioRoute = require('./src/routes/portfolio');
const projectRoute = require('./src/routes/project');

// Routes.
app.get('', (_, res) => {
  res.render('index', { title: '' });
});

app.get('/services', (_, res) => {
  res.render('services', { title: 'Services' });
});

app.get('/terms', (_, res) => {
  res.render('terms', { title: 'Terms', layout: './layouts/cardless-layout' });
});

app.use('/contact', contactRoute);
app.use('/portfolio', portfolioRoute);
app.use('/project', projectRoute);

// Run the HTTP server.
app.listen(port, () => {
  console.info(`App is running and listening at port: ${port}.`);
});

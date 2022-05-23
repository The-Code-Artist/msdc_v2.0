const express = require('express');
const database = require('../../database');

const portfolioRouter = express.Router();

portfolioRouter.get('', (_, res) => {
  const graphicProjects = database.projects.filter((p) => p.type === 'Graphic Design');
  const webProjects = database.projects.filter((p) => p.type === 'Web Development');

  res.render('portfolio', { 
    title: 'Portfolio',
    layout: './layouts/cardless-layout',
    graphicProjects: graphicProjects,
    webProjects: webProjects,
  })
});

module.exports = portfolioRouter;

const express = require('express');
const database = require('../../database');

const projectRouter = express.Router();

projectRouter.get('/:slug', (req, res) => {
  const project = database.projects.find((x) => x.slug === req.params.slug);
  const thumbs = project.thumbs;
  res.render('project', {
    project: project,
    title: project.title,
    layout: './layouts/project-layout',
    thumbs: thumbs,
  });
});

module.exports = projectRouter;

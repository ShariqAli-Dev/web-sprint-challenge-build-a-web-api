const express = require('express');
const helmet = require('helmet');
const projectsRoute = require('./projects/projects-router');
const actionsRoute = require('./actions/actions-router');
const server = express();
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// initial commit

server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectsRoute);
server.use('/api/actions', actionsRoute);

module.exports = server;

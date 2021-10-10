const express = require('express');
const helmet = require('helmet');
const projectRoute = require('./projects/projects-router');

const server = express();
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// initial commit

server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectRoute);

module.exports = server;

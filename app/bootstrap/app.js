const path = require('path');
const express = require('express');

const config = require('@config');
const crons = require('./crons');

const app = express();

/*
|--------------------------------------------------------------------------
| Registers cron commands
|
| register cron commands to run a specific time
|--------------------------------------------------------------------------
|
*/
crons.register(app);

/*
|--------------------------------------------------------------------------
| Setting the static folder
|--------------------------------------------------------------------------
|
| tell express to use the folder as static.
*/
app.use('/public', express.static(path.join(__dirname, '../public')));

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| start the express server to listen on the port
*/

app.listen(config.app.port, () => console.log(`🔥 App listening on port ${config.app.port}! 🚀`));

module.exports = app;

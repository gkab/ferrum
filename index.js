const express = require('express');
const app = express();
const config = require('config/config');

require('ferrum/app')(app);

app.listen(config.port, () => {
    console.log(`Listening in ${config.port}`);
});

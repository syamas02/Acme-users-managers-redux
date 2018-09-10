const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use(bodyParser.json());

syncAndSeed();

app.listen(port, () => console.log(`App listening to port ${port}`));

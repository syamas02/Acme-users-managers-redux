const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const { User } = models;
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use(bodyParser.json());

syncAndSeed();

app.listen(port, () => console.log(`App listening to port ${port}`));

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(next);
});

app.post('/api/users', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

app.get('/api/managers', (req, res, next) => {});

app.put('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

const express = require('express');
const app = express();
const path = require('path');
const { User, Product, syncAndSeed } = require('./db')
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, 'dist', 'main.js')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

syncAndSeed();

app.get('/api/products', (req, res, next) => {
    Product.findAll({
        order: [
            ['name', 'ASC']
        ]
    })
    .then(products => res.send(products))
})

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
})

app.put('/api/products/:id', (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => product.update(req.body))
        .then(product => res.send(product))
})

app.listen(port, () => console.log(`listening on port ${port}`))

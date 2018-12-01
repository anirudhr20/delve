const express = require('express');
const bodyParser = require('body-parser');

const leader = express.Router();
const Leaders = require('../models/lub');
leader.use(bodyParser.json());

leader.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((leads) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leads) => {
        console.log('leads Created ', leads);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leads);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports=leader;
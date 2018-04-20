const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bodyParser = require('body-parser')

router.get('/', function(req, res) {
  knex('donuts')
  .orderBy('id')
  .then(function (donuts) {
    console.log('hello')
    res.render('donuts/donuts_index', {donuts})
    // res.send(shops)
    // console.log(shops)
  });
});

router.post('/', function(req, res) {
  knex('donuts')
  .insert(req.body)
  .then(function (donuts) {
    res.redirect('/donuts')
  });
});

router.get('/:id/info', (req, res)=>{
  knex('donuts')
    .where('id', req.params.id)
    .first()
    .then(function (donut) {
      res.render('donuts/donuts_info', {donut, shop: {id: req.params.id}})
    });
})

router.get('/:id/edit', (req, res)=>{
  knex('donuts')
    .where('id', req.params.id)
    .first()
    .then(function (donut) {
      res.render('donuts/donuts_edit', {donut});
    });
});

router.put('/:id/edit', (req, res) => {
  knex('donuts')
    .where('id', req.params.id)
       .update(req.body)
       .then(function (donut){
         res.redirect('/donuts')
       })
});

router.get('/add', (req, res)=>{
  res.render('donuts/donuts_add');
})

router.delete('/:id', (req, res) => {
  knex('donuts')
    .where('id', req.params.id)
    .del()
    .then(function (donut){
      res.redirect('/donuts')
    })
});

module.exports = router;

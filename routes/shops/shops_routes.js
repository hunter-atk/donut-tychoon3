const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bodyParser = require('body-parser')

router.get('/', function(req, res) {
  knex('shops')
  .orderBy('id')
  .then(function (shops) {
    console.log('hello')
    res.render('shops/shops_index', {shops})
    // res.send(shops)
    // console.log(shops)
  });
});

router.post('/', function(req, res) {
  knex('shops')
  .insert(req.body)
  .then(function (shops) {
    res.redirect('/shops')
  });
});

router.get('/:id/info', (req, res)=>{
  knex('shops')
    .where('id', req.params.id)
    .first()
    .then(function (shop) {
      res.render('shops/shops_info', {shop})
    });
})

router.get('/:id/edit', (req, res)=>{
  knex('shops')
    .where('id', req.params.id)
    .first()
    .then(function (shop) {
      res.render('shops/shops_edit', {shop});
    });
});

router.put('/:id/edit', (req, res) => {
  knex('shops')
    .where('id', req.params.id)
       .update(req.body)
       .then(function (shop){
         res.redirect('/shops')
       })
});

router.get('/add', (req, res)=>{
  res.render('shops/shops_add');
})

router.delete('/:id', (req, res) => {
  knex('shops')
    .where('id', req.params.id)
    .del()
    .then(function (shop){
      res.redirect('/shops')
    })
});

module.exports = router;

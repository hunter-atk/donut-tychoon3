const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bodyParser = require('body-parser')

router.get('/', function(req, res) {
  knex('employees')
  .orderBy('id')
  .then(function (employees) {
    console.log('hello')
    res.render('employees/employees_index', {employees})
  });
});

router.post('/', function(req, res) {
  knex('employees')
  .insert(req.body)
  .then(function (employees) {
    res.redirect('/employees')
  });
});

router.get('/:id/info', (req, res)=>{
  knex('employees')
    .where('id', req.params.id)
    .first()
    .then(function (employee) {
      res.render('employees/employees_info', {employee})
    });
})

router.get('/:id/edit', (req, res)=>{
  knex('employees')
    .where('id', req.params.id)
    .first()
    .then(function (employee) {
      res.render('employees/employees_edit', {employee});
    });
});

router.put('/:id/edit', (req, res) => {
  knex('employees')
    .where('id', req.params.id)
       .update(req.body)
       .then(function (employee){
         res.redirect('/employees')
       })
});

router.get('/add', (req, res)=>{
  res.render('employees/employees_add');
})

router.delete('/:id', (req, res) => {
  knex('employees')
    .where('id', req.params.id)
    .del()
    .then(function (employee){
      res.redirect('/employees')
    })
});

module.exports = router;

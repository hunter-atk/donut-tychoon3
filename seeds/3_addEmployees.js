
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {first_name: 'Anna', last_name: 'Wintour', email: 'TBD', password: '', favorite_donut: 1, shop_id: 2},
        {first_name: 'Robin', last_name: 'Geoff', email: 'TBD', password: '', favorite_donut: 4, shop_id: 1},
        {first_name: 'John', last_name: 'Smith', email: 'TBD', password: '', favorite_donut: 4, shop_id: 4},
        {first_name: 'Ashley', last_name: 'Wilkes', email: 'TBD', password: '', favorite_donut: 2, shop_id: 3}
      ]);
    });
};

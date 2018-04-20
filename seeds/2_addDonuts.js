
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('donuts').del()
    .then(function () {
      // Inserts seed entries
      return knex('donuts').insert([
        {name: 'Blue Devil', topping: 'blue sprinkles', price: 3},
        {name: 'Old Fashioned', topping: 'glaze', price: 1},
        {name: 'Strawberry Fields', topping: 'strawberries', price: 2},
        {name: 'Vegan dream', topping: 'vegan chocolate', price: 6}
      ]);
    });
};

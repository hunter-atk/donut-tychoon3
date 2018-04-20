
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shops').del()
    .then(function () {
      // Inserts seed entries
      return knex('shops').insert([
        {name: "Howdy Donuts", city: 'Austin'},
        {name: 'Krispy Kreme', city: 'Dallas'},
        {name: 'Dunkin Donuts', city: 'Montville'},
        {name: "Voodoo Donuts", city: 'Austin'}
      ]);
    });
};

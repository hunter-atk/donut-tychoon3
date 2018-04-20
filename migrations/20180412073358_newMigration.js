exports.up = function(knex, Promise) {
 return createShops()
 .then(createDonuts)
 .then(createEmployees)
 .then(createShop_Donut)

 function createShops(){
   console.log('Creating Shops');
   return knex.schema.createTable('shops', function(table){
     table.increments();
     table.string('name');
     table.string('city');
   })
 }

 function createDonuts(){
   return knex.schema.createTable('donuts', function(table){
     table.increments();
     table.string('name');
     table.string('topping');
     table.integer('price');
   })
 }

 function createEmployees(){
   return knex.schema.createTable('employees', function(table){
     table.increments();
     table.string('first_name');
     table.string('last_name');
     table.string('email');
     table.string('password');
     table.integer('favorite_donut');
     table.foreign('favorite_donut').references('donuts.id');
     table.integer('shop_id');
     table.foreign('shop_id').references('shops.id').onDelete('CASCADE');
   })
 }

 function createShop_Donut(){
   return knex.schema.createTable('shop_donut', function(table){
     table.increments();
     table.integer('shop_id');
     table.foreign('shop_id').references('shops.id').onDelete('CASCADE');
     table.integer('donut_id');
     table.foreign('donut_id').references('donuts.id').onDelete('CASCADE');
   })
 }
}


exports.down = function(knex, Promise) {
 return Promise.all([knex.schema.dropTable("shops"), knex.schema.dropTable("donuts"), knex.schema.dropTable("employees"), knex.schema.dropTable("shop_donut")]);
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tb => {
    tb.increments();
    tb.string("full_name")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary().unsigned().notNullable();
    table.text("content");
    table.integer("score");
    table.integer("critic_id").unsigned().notNullable();
    table.timestamps(false, true);
    table
      .foreign("critic_id")
      .references("critic_id")
      .inTable("critics")
      .onDelete("cascade");
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};

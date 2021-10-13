const knex = require("../db/connection");

function list() {
  return knex("movies as m").select("*");
}

function read(movie_id) {
  return knex("movies as m").select("*").where({ movie_id: movie_id }).first();
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": "1" });
}

function readTheaters(movie_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movie_id });
}

function readReviews(movie_id) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movie_id });
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
  listShowing,
};

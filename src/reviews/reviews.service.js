const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ critic_id: updatedReview.critic_id })
    .update(updatedReview, "*")
    .then((review) => review[0]);
}

function destroy(review_id) {
  return knex("reviews").where({ review_id: review_id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};

const theatersService = require("./theaters.service");
const reduceProp = require("../utils/reduce-properties");

const reduceTheater = reduceProp("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"],
});

async function list(req, res, next) {
  const data = await theatersService.list();
  const reducedData = reduceTheater(data);
  res.json({ data: reducedData });
}

module.exports = {
  list,
};

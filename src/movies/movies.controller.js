const moviesService = require("./movies.service");
const reduceProp = require("../utils/reduce-properties");

async function correctId(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    next();
  }
  next({
    status: 404,
    message: `Movie cannot be found.`,
  });
}

async function list(req, res, next) {
  const is_showing = req.query.is_showing;
  if (is_showing) {
    const data = await moviesService.listShowing();
    const checkMovie = [];
    const newMovies = [];
    data.forEach((dat) => {
      const movie = dat.movie_id;
      if (!checkMovie.includes(movie)) {
        checkMovie.push(movie);
        newMovies.push(dat);
      }
    });
    res.json({ data: newMovies });
  } else {
    const data = await moviesService.list(is_showing);
    res.json({ data });
  }
}

async function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readTheaters(req, res, next) {
  const data = await moviesService.readTheaters(req.params.movieId);
  res.json({ data });
}

const reduceCritic = reduceProp("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

async function readReviews(req, res, next) {
  const data = await moviesService.readReviews(req.params.movieId);
  const reducedData = reduceCritic(data);
  reducedData.forEach((eachCritic) => {
    eachCritic.critic = eachCritic.critic[0];
  });
  res.json({ data: reducedData });
}

module.exports = {
  list: list,
  read: [correctId, read],
  readTheaters,
  readReviews,
};

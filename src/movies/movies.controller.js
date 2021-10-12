const moviesService = require("./movies.service");

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
  if (is_showing && is_showing === "true") {
    const data = await moviesService.listShowing();
    //fix 45 items returning instead of 15
    data.forEach((element) => {
      // console.log(`check ${element}`);
    });
    res.json({ data });
  } else {
    const data = await moviesService.list();
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

//get critic content into seperate critic key.
async function readReviews(req, res, next) {
  const data = await moviesService.readReviews(req.params.movieId);
  //  console.log(data)
  res.json({ data });
}

module.exports = {
  list: list,
  read: [correctId, read],
  readTheaters,
  readReviews,
};

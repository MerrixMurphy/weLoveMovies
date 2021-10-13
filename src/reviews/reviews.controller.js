const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProp = require("../utils/reduce-properties");

async function correctId(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

const reducedCritics = reduceProp("review_id", {
  organization_name: ["critic", null, "organization_name"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
});

//figure out why update returns undefined
async function update(req, res, next) {
  const check = {
    score: res.locals.review.score,
    content: res.locals.review.content,
  };
  const data = await reviewsService.update(check);
  console.log(data);
  // const reducedData = reducedCritics(data);
  // console.log(reducedData);
  res.json({ data });
}

async function destroy(req, res, next) {
  await reviewsService.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(correctId), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(correctId), asyncErrorBoundary(destroy)],
};

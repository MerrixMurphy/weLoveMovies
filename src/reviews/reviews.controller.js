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

const reducedCritics = reduceProp("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  review_id: ["critic", null, "review_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

//figure out why update returns undefined
async function update(req, res, next) {
  const toUpdate = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const updatedReview = await reviewsService.update(toUpdate);
  toUpdate.critic = updatedReview;
  res.json({ data: toUpdate });
}

async function destroy(req, res, next) {
  await reviewsService.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(correctId), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(correctId), asyncErrorBoundary(destroy)],
};

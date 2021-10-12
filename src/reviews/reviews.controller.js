const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

//figure out why update returns undefined
async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    // content: res.locals.review.content,s
  };
  // console.log(updatedReview);
  const data = await reviewsService.update(updatedReview);
  // console.log(data);
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

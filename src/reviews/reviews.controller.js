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

//figure out why req.body.data not working and add in the critics
async function update(req, res, next) {
  // console.log("Check");
  // console.log(res.locals.review.content);
  console.log(req.body);
  const updatedReview = {
    ...res.locals.review,
    // content: res.locals.review.content,
  };
  console.log(updatedReview);
  const data = await reviewsService.update(updatedReview);
  console.log(data);
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

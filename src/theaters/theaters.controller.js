const theatersService = require("./theaters.service");

//made basic list method and need to make a movies key to hold all movies based on utils map and reduce-properties
async function list(req, res, next) {
  const data = await theatersService.list();
  // console.log(data);
  res.json({ data });
}

module.exports = {
  list,
};

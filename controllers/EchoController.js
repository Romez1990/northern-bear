exports.testGet = function(req, res, next) {
  res.send(req.query);
};

exports.testPost = function(req, res, next) {
  res.send(req.body);
};

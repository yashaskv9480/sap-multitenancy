module.exports = function viewAuth(req, res) {
  const authInfo = req.authInfo;
  if (!authInfo || !authInfo.checkLocalScope("view")) {
    res.status(401).send("Unauthorized");
    return;
  }
};

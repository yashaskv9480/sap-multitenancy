module.exports = async function jobSchedularAuth(req, res) {
  const authInfo = req.authInfo;
  const token = req.authInfo.config.jwt;
  if (!authInfo || !authInfo.checkLocalScope("Jobschedular")) {
    await notifyAdmin("Unauthorized");
    res.status(401).send({ message: "Unauthorized", token: token });
    return;
  }
};

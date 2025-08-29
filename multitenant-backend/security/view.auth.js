const { notifyAdmin } = require("../functions/notifyAdmin");

module.exports = async function viewAuth(req, res) {
  const authInfo = req.authInfo;
  const token = req.authInfo.config.jwt;
  if (!authInfo || !authInfo.checkLocalScope("view")) {
    await notifyAdmin("Unauthorized");
    console.log("Unauthorized token: ", token);
    res.status(401).send({ message: "Unauthorized", token: token });
    return;
  }
};

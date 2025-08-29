const express = require("express");
const passport = require("passport");
const { XssecPassportStrategy, XsuaaService } = require("@sap/xssec");
const { getServices } = require("@sap/xsenv");
const { notifyAdmin } = require("./functions/notifyAdmin");
const jobSchedularAuth = require("./security/jobSchedular.auth");
const xsuaa = getServices({ uaa: { tag: "xsuaa" } }).uaa;

const app = express();

async function jwtLogger(req, res, next) {
  console.log("===> Binding: $XSAPPNAME: " + xsuaa.xsappname);
  console.log("===> Binding: clientid: " + xsuaa.clientid);
  console.log("===> Decoding JWT token sent by clientapp");
  const authHeader = req.headers.authorization;
  console.log("===> Auth header: ", authHeader);
  if (authHeader) {
    const theJwtToken = authHeader.substring(7);
    if (theJwtToken) {
      const jwtBase64Encoded = theJwtToken.split(".")[1];
      const jwtDecoded = Buffer.from(jwtBase64Encoded, "base64").toString(
        "ascii"
      );
      const jwtJson = JSON.parse(jwtDecoded);
      console.log("===> JWT: audiences: ");
      jwtJson.aud.forEach((entry) => console.log(`          -> ${entry}`));
      console.log("===> JWT: scopes: " + jwtJson.scope);
      console.log("===> JWT: authorities: " + jwtJson.authorities);
      console.log("===> JWT: client_id: " + jwtJson.client_id);
    }
  }
  next();
}

app.use(async (req, res, next) => {
  await jwtLogger(req, res, next);
});

const authService = new XsuaaService(xsuaa);
passport.use(new XssecPassportStrategy(authService));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));
app.enable("cors");

function getTenantSubdomain(req) {
  return req.tokenInfo?.getPayload?.()?.ext_attr?.zdn ?? "";
}

app.get("/", (req, res) => {
  res.send(
    'Backend is up. Try <a href="/show-tenant">/show-tenant</a> via approuter.'
  );
});

app.get("/show-tenant", (req, res) => {
  const tenant = getTenantSubdomain(req);
  res.send(`Hello from tenant subdomain: <strong>${tenant}</strong>`);
});

app.get("/show-tenant2", function (req, res, next) {
  try {
    var line1 = "Hi " + req.authInfo.getLogonName();
    var line2 = "your tenant sub-domain is " + req.authInfo.getSubdomain();
    var line3 = "your tenant zone id is " + req.authInfo.getZoneId();
    var responseMsg = line1 + "; " + line2 + "; " + line3;
    res.send(responseMsg);
  } catch (e) {
    console.log("AuthInfo object undefined.");
    var responseMsg = "Hello, World!";
    res.send(responseMsg);
  }
});

app.get("/notify-admin", jobSchedularAuth, async (req, res) => {
  console.log("The request received:");
  await notifyAdmin("Test notification");
  res.send({ message: "Notification sent to Teams" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

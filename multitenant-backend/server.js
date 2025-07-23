const express = require("express");
const passport = require("passport");
const { XssecPassportStrategy, XsuaaService } = require("@sap/xssec");
const { getServices } = require("@sap/xsenv");

const app = express();

const xsuaa = getServices({ uaa: { tag: "xsuaa" } }).uaa;
const authService = new XsuaaService(xsuaa);
passport.use(new XssecPassportStrategy(authService));

app.use(passport.initialize());
app.use(passport.authenticate("JWT", { session: false }));
app.enable("cors");

function getTenantSubdomain(req) {
  console.log(req.tokenInfo?.getPayload?.());
  return req.tokenInfo?.getPayload?.()?.ext_attr?.zdn ?? "";
}

app.get(
  "/show-tenant",
  passport.authenticate("JWT", { session: false }),
  (req, res) => {
    const tenant = getTenantSubdomain(req);
    res.send(`Hello from tenant subdomain: <strong>${tenant}</strong>`);
  }
);

app.get("/", (req, res) => {
  res.send(
    'Backend is up. Try <a href="/show-tenant">/show-tenant</a> via approuter.'
  );
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

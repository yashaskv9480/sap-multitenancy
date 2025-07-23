const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/callback/application/v1/dependencies", (req, res) => {
  const dependencies = [];
  res.status(200).json(dependencies);
});

app.put("/callback/application/v1/tenants/:tenantID", (req, res) => {
  const { tenantID } = req.params;
  const { subscribedSubdomain } = req.body;
  const tenantURL = `https://${subscribedSubdomain}-multitenant-approuter.cfapps.ap10.hana.ondemand.com`;
  console.log(
    `Onboarding tenant: ${tenantID}, subdomain: ${subscribedSubdomain}`
  );
  res.status(200).send(tenantURL);
});

app.delete("/callback/application/v1/tenants/:tenantID", (req, res) => {
  const { tenantID } = req.params;
  const { subscribedSubdomain } = req.body;
  const tenantURL = `https://${subscribedSubdomain}-multitenant-approuter.cfapps.ap10.hana.ondemand.com`;
  console.log(`Offboarding tenant: ${tenantID}`);
  res.status(200).send(tenantURL);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

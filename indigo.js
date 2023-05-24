const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const csvFilePath = "./ShippiRawData.csv";
const csv = require("csvtojson");

app.use(bodyParser.json());
app.post("/api/shipmentinfo", async (req, res) => {
  const jsonObj = await csv().fromFile(csvFilePath);
  const result = jsonObj.filter(
    (shipment) =>
      shipment["Min Shipment Weight (KG)"] <= new Number(req.body.shipWeight) &&
      shipment["Max Shipment Weight (KG)"] >= new Number(req.body.shipWeight) &&
      shipment["Shipment Type"] == req.body.shipType
  );
  console.log(req.body.shipWeight);
  res.json(result[0]);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

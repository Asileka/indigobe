const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const csvFilePath = "./ShippiRawData.csv";
const csv = require("csvtojson");
const sampleReqObj = {
  shipWeight: "1",
  shipType: "International",
  shipSendAddrs: "BL6A76",
  shipRecieveAddrs: "M73RT",
  shipDate: "26/04/2024",
};
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log("csv converted");
  });
app.use(bodyParser.json());
app.get("/api/helloworld", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/jsonobj", async (req, res) => {
  const jsonObj = await csv().fromFile(csvFilePath);
  res.send(jsonObj[0]["Max Shipment Weight (KG)"]);
});
app.post("/api/shipmentinfo", async (req, res) => {
  const jsonObj = await csv().fromFile(csvFilePath);
  const result = jsonObj.filter(
    (shipment) =>
      shipment["Min Shipment Weight (KG)"] <= req.body.shipWeight &&
      shipment["Max Shipment Weight (KG)"] >= req.body.shipWeight
  );
  console.log(result);
  res.json(result[0]);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const Customer = require("./models/customers");
require("./db/conn");
const Student = require("./models/customers");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.get("/customer/:email", async (req, res) => {
  try {
    const emailuser = req.params.email;
    const customerData = await Customer.find({ email: emailuser });
    //console.log(customerData);
    console.log(customerData);
    if (!customerData) {
      return res.status(404).send();
    }
    else {
      res.send(customerData);
    }
  }
  catch (e) {
    res.send(e);
  }
});
app.get("/customers", async (req, res) => {

  try {
    const customerData = await Customer.find();
    res.send(customerData);
  } catch (e) {
    res.send(e);
  }
});

app.patch("/customer/:email", async (req, res) => {
  try {
    const emailuser = req.params.email;
    const upcustomerData = await Customer.findOneAndUpdate({ email: emailuser }, req.body);
    //console.log(customerData);
    console.log(upcustomerData);
    res.send(upcustomerData);
  }
  catch (e) {
    res.send(e);
  }
});
//create new customer
app.post("/customer/create", (req, res) => {
  console.log(req.body);
  const user = new Customer(req.body);
  user.save().then(() => {
    res.status(201).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});
app.listen(port, () => {
  console.log(`connection set up at port ${port}`);
});


const express = require('express');
const app = express()
const SubscriberModel = require('./models/subscribers');


// Your code goes here
app.get("/subscribers", async (req, res) => {
  res.send(await SubscriberModel.find());
});

// app.get('subscribers/names', async (req, res) => {
//   const fullResults = await SubscriberModel.find();
//   const mappedResults = fullResults.map(doc => {
//     return {
//       name: doc.name,
//       subscribedChannel: doc.subscribedChannel 
//     }
//   });
//   res.send(mappedResults);
// });

app.get("subscribers/names", async (req, res) => {
  const projectedResults = await SubscriberModel.find().select({
    name: true,
    subscribedChannel: true,
    _id: false
  });
  res.send(projectedResults);
});

app.get("subscribers/:id", async(req, res) => {
  const idToSearch = req.params.id;
  try{
  const doc = await SubscriberModel.findOne({_id: idToSearch});
  if(doc == null) {
   res.status(400).send({message: "Incorrect id format"});
  } else {
    res.send(doc);
  }
  } catch(err) {
    res.status(400).send({message: err.message});
  }
});
















module.exports = app;

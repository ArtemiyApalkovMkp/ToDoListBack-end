const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

const apiRoutes = require("./src/modules/routes/routes")

app.use(cors());

const uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use("/", apiRoutes);

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
});
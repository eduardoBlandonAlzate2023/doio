const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');
require("dotenv").config({ path: '../../.env' });

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use("/", routes);
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

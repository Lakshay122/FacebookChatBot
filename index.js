
const express = require("express");

const viewEngine = require("./config/viewEngine");

const initWebRoutes = require("./routes/web");

const bodyParser = require("body-parser");

let app = express();
viewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
initWebRoutes(app);
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});

const express = require("express");
const { getHomepage } = require("../controllers/homepageController");

const router = express.Router();

let initWebRoutes = (app) => {
    router.get("/",getHomepage);
    return app.use("/",router);
}

module.exports = initWebRoutes;




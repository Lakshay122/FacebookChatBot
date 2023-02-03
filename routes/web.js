const express = require("express");
const { postWebhook, getWebhook } = require("../controllers/chatBotController");
const { getHomepage } = require("../controllers/homepageController");

const router = express.Router();

let initWebRoutes = (app) => {
    router.get("/",getHomepage);
    router.get("/webhook",getWebhook);
    router.post("/webhook",postWebhook);
    return app.use("/",router);
}

module.exports = initWebRoutes;




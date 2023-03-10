require("dotenv").config();
exports.postWebhook = (req,res,next) => {
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

 
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // // Check if the event is a message or postback and
            // // pass the event to the appropriate handler function
            // if (webhook_event.message) {
            //     handleMessage(sender_psid, webhook_event.message);
            // } else if (webhook_event.postback) {
            //     handlePostback(sender_psid, webhook_event.postback);
            // }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

exports.getWebhook = (req,res,next) => {
    // Your verify token. Should be a random string.
    console.log("hey");
    let VERIFY_TOKEN = process.env.MY_VERIFY_FB_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
           
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}



//curl -X GET "localhost:8080/webhook?hub.verify_token=justaverifytoken123456&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
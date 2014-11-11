//jenkinsController
(function (jenkinsController) {
    var bodyParser = require('body-parser'),
        config = require('../config'),
        eventStore = require('./helpers/eventStore');

    jenkins.controller.init = function(app) {
        app.post('api/jenkinsHook',, bodyParser.json(), function(req, res) {
            var translator = require('./translators/jenkinsTranslator');
            var events = translator.translateNotification(req.body);
            var es = new eventStore(config.eventStoreBaseUrl, config.eventStoreUser, config.eventStorePassword);

            es.pushEvents(JSON.stringify(events), function(error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Posted to eventstore.');
                    console.log(response.statusCode);
                }
            });
            res.json({ message: 'Your push event is in queue to be added to CommitStream.' });
            res.end();
        });
    };
})(module.exports)
(function(api) {
  var settingsController = require('./settingsController'),
    config = require('../config')
    integrationManager = require('../integrationManager');

  api.init = function(app) {
    settingsController.init(app);

    integrationManager.loadIntegrations(config.integrations, function(integration){
      integration.controllers.forEach(function(controller) {
        controller.init(app, config);
      });
    });
  };
})(module.exports);
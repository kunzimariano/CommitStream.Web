(function(api) {

  var githubCommits = require('github-commits'),
    settingsController = require('./settingsController'),
    config = require('../config');

  api.init = function(app) {
    settingsController.init(app);

    githubCommits.controllers.forEach(function(controller) {
      controller.init(app, config);
    });

  };
})(module.exports);
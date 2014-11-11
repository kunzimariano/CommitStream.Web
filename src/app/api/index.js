(function(api) {

  var githubCommits = require('github-commits'),
    settingsController = require('./settingsController'),
    config = require('../config');

  api.init = function(app) {
    githubCommits.importController.init(app, config);
    githubCommits.queryController.init(app, config);
    settingsController.init(app);
  };
})(module.exports);
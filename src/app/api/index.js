(function(api) {

  var githubCommits = require('github-commits'),
    settingsController = require('./settingsController');

  api.init = function(app) {
    githubCommits.importController.init(app);
    githubCommits.queryController.init(app);
    settingsController.init(app);
  };
})(module.exports);
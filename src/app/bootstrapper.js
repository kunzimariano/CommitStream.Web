(function(bootstrapper) {

  bootstrapper.boot = function(config) {
    var _ = require('underscore'),
      githubCommits = require('github-commits'),
      EventStore = require('eventstore-client');

    var es = new EventStore({
      baseUrl: config.eventStoreBaseUrl,
      username: config.eventStoreUser,
      password: config.eventStorePassword
    });

    console.log('Looking for already existing projections...');
    es.projections.get(function(error, response) {
        initProjections(JSON.parse(response.body));
    });

    var initProjections = function(projectionsFound) {
      console.log('Looking for new projections...');
      githubCommits.getProjections(function(item) {
        if (!_.findWhere(projectionsFound.projections, { effectiveName: item.name })) {
          createProjection(item)
        } else {
          console.log('OK found ' + item.name);
        }
      });
    };

    var createProjection = function(projectionObject) {
      es.projections.post(projectionObject, function(error, response) {
        if (error) {
          console.error('ERROR could not create projection ' + projectionObject.name + ':');
          console.error(error);
        } else {
          console.log('OK created projection ' + projectionObject.name);
          console.log(response.body);
        }
      });
    };

  }
})(module.exports);
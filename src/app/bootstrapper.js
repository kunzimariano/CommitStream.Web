(function(bootstrapper) {

  bootstrapper.boot = function(config) {
    var _ = require('underscore'),
      EventStore = require('eventstore-client'),
      integrationManager = require('./integrationManager');

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
      var createNewProjections = function(item) {
        if (!_.findWhere(projectionsFound.projections, {
          effectiveName: item.name
        })) {
          createProjection(item)
        } else {
          console.log('OK found ' + item.name);
        }
      };
      console.log('Looking for new projections...');
      integrationManager.loadIntegrations(config.integrations, function(integration) {
        integration.getProjections(createNewProjections);
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
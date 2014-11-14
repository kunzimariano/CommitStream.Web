module.exports.loadIntegrations = function(integrations, cb) {
  integrations.forEach(function(moduleName) {
    if (moduleName.indexOf('/') > -1) {
      moduleName = moduleName.split('/')[1];
    }
    var integration = require(moduleName);
    cb(integration);
  });
}
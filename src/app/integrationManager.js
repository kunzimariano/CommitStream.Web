module.exports.loadIntegrations = function(integrations, cb) {
  integrations.forEach(function(moduleName) {
    var parts = moduleName.split('/')
    // gets the last token from the array which in this case is the module name
    // modulename
    // gitowner/gitrepo
    // ../folder/anotherfolder/modulename
    var integration = require(parts[parts.length - 1]);
    cb(integration);
  });
}
module.exports.loadIntegrations = function(integrations, cb) {
  integrations.forEach(function(moduleName) {
    var tokens = moduleName.split('/')
    // gets the last token from the array which in this case is the module name
    // modulename
    // gitowner/gitrepo
    // ../folder/anotherfolder/modulename
    var lastToken = tokens[tokens.length - 1];
    // now for cases like the next git://github.com/user/project.git#branch-or-tag
    tokens = lastToken.split('.git');
    var integration = require(tokens[0]);
    cb(integration);
  });
}
var config = require('./config'),
  npm = require('npm');

var getModuleName = function(s) {
  var tokens = s.split('/')
    // gets the last token from the array which in this case is the module name
    // modulename
    // gitowner/gitrepo
    // ../folder/anotherfolder/modulename
  var lastToken = tokens[tokens.length - 1];
  // now for cases like the next git://github.com/user/project.git#branch-or-tag
  tokens = lastToken.split('.git');
  return tokens[0];
}

console.log('Installing integrations...')
npm.load({}, function(err) {
  if (err) console.log(err);
  npm.commands.install(config.integrations, function(er, data) {
    if (er) console.log(er);
    console.log('Integrations have been installed.');
  });
});
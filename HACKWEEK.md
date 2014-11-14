# Goal #
We wanted to split the previous Commit Stream service into smaller modules. Before the hack week we had a monolithic service that contained it all. The main reason for that was to prove it is possible to make it a general purpose integration service where you could decide which integration to run by just changing a configuration file.

## First step ##
 The first thing we needed to do was breaking apart what we already had into smaller pieces.

IntegrationStream

- github-commits
 - eventstore-client


## Next steps ##

IntegrationStream

- github-commits
 - eventstore-client
- jenkins-jobs
 - eventstore-client

## Structure of an integration plugin ##
What do you need to do in order to write a plugin?
The first thing to do is to create the right structure for your module.
```
	package.json	
	\lib
		index.js
		controller01.js
		controller02.js
		\projections
			projection01.js
			projection02.js
	\test
		controller01.tests.js
		controller02.tests.js
		\projections
			projection01.tests.js
			projection02.tests.js
```
The next is to make available in your module and array of the controllers you want to run and a function that returns the projections with their names and content.


Your index.js should look something like this:
```javascript
var controller01 = require('./controller01'),
	controller02 = require('./controller02'),

exports.controllers = [controller01, controller02];

exports.getProjections = function(callback){
	callback({
          name: 'yourProjectionName',
          projection: 'The projection itself, the script.'
        });
}
```

## How does this work? ##
You need to decide which integration you are going to run, in order to do that modify the config.json in the integration service so it looks something like the next:
```javascript
"integrations" : ["kunzimariano/github-commits","matiasheffel/jenkins-jobs"]
```
When the service starts this will make it download those modules on runtime, once that is done it will load their controllers and projections. It is all dynamic, you don't need to put those modules in the package.json.

**Modules installation**
```javascript
npm.load({}, function(err) {
	npm.commands.install(config.integrations, function(er, data) {
	// do what you need to do after the modules are installed
	
	});
});
```

**Controllers loading**
```javascript
integrationManager.loadIntegrations(config.integrations, function(integration){
	integration.controllers.forEach(function(controller) {
    	controller.init(app, config);
	});
});
```

**Projections loading**
```javascript
integrationManager.loadIntegrations(config.integrations, function(integration) {
	integration.getProjections(createNewProjections);
});
```
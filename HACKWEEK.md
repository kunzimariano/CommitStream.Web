# Goal #
We wanted to split the previous Commit Stream service into smaller modules. Before the hack week we had a monolithic service that contained it all. The main reason for that was proving it was possible to make it a general purpose integration service where you could decide which integration to run. 

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

```javascript
exports.controllers = [];

exports.getProjections = function(callback){
}
```

## How does this work? ##
      
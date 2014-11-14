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
      
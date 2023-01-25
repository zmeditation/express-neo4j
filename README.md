# node-express-neo4j

#### Intro

This repo includes a node/express/neo4j api that exposes the following endpoints:

- POST /v1/users
- GET /v1/users/:id
- POST /v1/users/follow

It uses DI and hexagonal architecture to achieve loose coupling between infra and application layers. The architecture pattern was used for demonstration purpose - the domain is not complex enough to warrant it.

#### Local Development

To run project locally you will need to create a Neo4j account and free tier Aura instance [here](https://login.neo4j.com/u/login/identifier?state=hKFo2SBtN1kwLWpTbWpXOFJYOXM3SFBLQ2VpVGRvWUpBdWpuSKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHlFajZ4U2F2am5yYWkybVBsRkJDT1RDZFQ5blFrUUZWo2NpZNkgV1NMczYwNDdrT2pwVVNXODNnRFo0SnlZaElrNXpZVG8)

Create a .env file in the root of the project using the .env.example as a template. You will need details of your Neo4j Aura instance to complete this step.

To run the api

```bash
1. yarn
2. yarn dev
```

#### Example requests

Create user

```
curl --request POST \
  --url http://localhost:8000/v1/users \
  --header 'Content-Type: application/json' \
  --data '{
	"email": <email>,
	"firstName": <firstName>,
	"lastName": <lastName>
}'
```

Get user by Id

```
curl --request GET \
  --url http://localhost:8000/v1/users/:id
```

Follow a user

```
curl --request POST \
  --url http://localhost:8000/v1/users/follow \
  --header 'Content-Type: application/json' \
  --data '{
	"actorId": <actorId>,
	"subjectId": <subjectId>
}'
```

#### TODOs

- [ ] inject request scoped logger
- [ ] explore [neo-forgery](https://github.com/YizYah/neo-forgery) and other neo4j testing utils
- [ ] explore [neo4j-graphql library](https://neo4j.com/developer/graphql/)
- [ ] dockerize and deploy to local k8s cluster
- [ ] build out domain and seed for performance testing

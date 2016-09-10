# HYPER // LAN

Get started with docker or horizon.
Common for both approaches is installing dependencies and building project

```javascript
npm install
npm run buildDev
```

To log in you have to provide your own secrets

## Docker

Assuming you have docker-compose installed, run the composer and connect to your docker machine ip with port 8181.

````javascript
docker-compose up -d
```

## Horizon

Horizon lets you spin up a local database in this folder, and will tell you the port it serves the project at.

```javascript
npm install -g horizon
hz init
hz serve --dev
```

### Production steps

Upload .hz folder with
- config.toml
- schema.toml

Spin up horizon server using your flavour of [docker-compose.yml](https://github.com/rethinkdb/horizon/blob/next/docker-compose.prod.yml).

Log in to docker container, apply schema.toml using the ```hz schema apply``` command.
 


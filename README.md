# Milieu Intérieur

This package builds the Milieu Intérieur project website.

## Local development

Prerequisite: you will need [NodeJS](https://nodejs.org/en/) installed on your machine.

- Install [npm](https://www.npmjs.com/) if required.
- Clone the repository `git clone git@github.com:richhigginsdigital/milieu-interieur.git` on to your machine and navigate to the repository root in a terminal window.
- Install Gatsby's command line tool `npm install --global gatsby-cli`
- Install the NPM dependencies run `npm install`

### Environment variables

The development scripts rely on local environment configuration files to store the required environment variables. Create those config files by copying the sample, then populate them with the required config values:

```shell script
cp .env.sample .env.development && cp .env.sample .env.production
```

### Run the development script

The development script builds and serves the site on <http://localhost:8000> based on the environment variables found in `.env.development`, and automatically reloads on file changes:

```shell script
npm run develop
```

### Run a production build

You can test the production build, which will use the environment variables found in `.env.production`, by running the following:

```shell script
npm run build
```

This will compile the site in a production-like state. It can then be served on <http://localhost:9000> by running:

```shell script
npm run serve
```

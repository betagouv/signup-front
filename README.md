# France Connect + Api Particulier + Jeux de données disponibles et contractualisation

:warning: This doc needs updates. Installation instructions can be found [here](https://github.com/betagouv/signup.api.gouv.fr-docker).

# Présentation


## Contribuer au code

Ce projet _front_ est basé sur [Next.js](https://github.com/zeit/next.js), il utilise [React](https://reactjs.org) et [React Next](https://github.com/zeit/next.js/).

### Pré-requis

* [Node.js](https://nodejs.org) version 6 ou supérieure
* [yarn](https://yarnpkg.com)

## Comment l'utiliser ?

[Cloner le repertoire](git@github.com:betagouv/api-particulier-courtier-front.git):

### Installation des dépendances

```bash
yarn
```

### Développement

TO BE CONTINUED

### Pour lancer le serveur OAuth

[Cloner le repertoire](git@github.com:betagouv/api-particulier-courtier-oauth.git)

Suivre le readme puis lancer le serveur sur le port de son choix (celui renseigné sur le .env.test) :
`rails s -p 3022`


### Lancer les tests

```bash
yarn test
```

Il est possible de voir la couverture de test
```bash
yarn test --coverage
```

Une version html est disponible en local `front/coverage/lcov-report/index.html`

### Génération des bundles de production

```bash
yarn build
```

### Déployer sur gh-pages:

```bash
yarn deploy
```

## License

MIT

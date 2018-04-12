# France Connect + Api Particulier + Jeux de données disponibles et contractualisation

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

Afin de configurer le projet correctement, il est conseillé de créer un fichier `.env` avec les variables d’environnement nécessaires à l’application.

`.env` permet de persister les variables d’environnement de développement dans un fichier plutôt que de les définir dans le shell, mais les deux fonctionnent. Cela fonctionne avec [dotenv](https://github.com/motdotla/dotenv) et [babel-plugin-dotenv-import](https://github.com/tusbar/babel-plugin-dotenv-import).

Un fichier  existe : `.env.test`.
Le mettre à jour avec les ports utilisés en test

Pour obtenir une configuration de base :

```bash
cp .env.test .env
```

Enfin, lancer le serveur de développement avec :

```bash
yarn dev
```

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

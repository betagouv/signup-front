# France Connect + Api Particulier + Jeux de données disponibles et contractualisation

# Présentation


## Contribuer au code

Ce projet _front_ est basé sur [Next.js](https://github.com/zeit/next.js), il utilise [React](https://reactjs.org).

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

Un fichier d’example existe : `.env.example`. Pour obtenir une configuration de base :

```bash
cp .env.example .env
```

Enfin, lancer le serveur de développement avec :

```bash
yarn dev
```

### Lancer les tests

```bash
yarn test
```

### Génération des bundles de production

```bash
yarn build
```

### Déployer sur gh-pages:

```bash
yarn deploy
```
-> WIP, deploy.sh

## License

MIT

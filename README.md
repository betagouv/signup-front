# Frontend de l'outil d'habilitation des API api.gouv.fr

:warning: This project is not a standalone yet. For now, it needs the [private signup-ansible repository](https://gitlab.incubateur.net/beta.gouv.fr/signup-ansible) to work.

## Usage statistics

This project uses [Matomo](https://matomo.org/) to report usage statistics.
To use your Matomo credentials to the app, pass them as environment variables

```bash
PIWIK_URL=http://mywebsite.domain
PIWIK_SITE_ID=123456789
```

If you don't use Matomo, pass:

```bash
PIWIK_URL=''
PIWIK_SITE_ID=''
```

The usage of this project can be seen on [http://www.stats.data.gouv.fr](http://stats.data.gouv.fr/index.php?module=CoreHome&action=index&idSite=53&period=range&date=previous30#?module=Dashboard&action=embeddedIndex&idSite=53&period=range&date=previous30&idDashboard=1)

## How to enroll a new API

Here are the files you need to create :

- src/pages/NameOfApi.js (describe all the information to generate the new form)

Here are the files you need to update :

- src/App.js (declare new route to access the api form)
- src/pages/AdminEnrollmentList.js (declare API Labels in enrollment list view)
- (optional) src/lib/utils.js (L~38) (declare valid naf code)

## License

MIT

Powered by: [<img src="http://www.browserstack.com/images/layout/browserstack-logo-600x315.png" height="100"/>](https://www.browserstack.com/)

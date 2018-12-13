import React from 'react';
import PropTypes from 'prop-types';
import { OauthLink } from '../../pages/OauthCallback';
import { getServiceProviders } from '../../lib/services';
const {
  REACT_APP_FRANCE_CONNECT_AUTHORIZE_URI: FRANCE_CONNECT_AUTHORIZE_URI,
  REACT_APP_FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI: FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI,
} = process.env;

class FranceConnectServiceProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serviceProviders: [],
      serviceProvidersSelectedIndex: '',
      noServiceProviders: false,
      isServiceProvidersLoading: true,
    };

    this.handleServiceProviderChange = this.handleServiceProviderChange.bind(
      this
    );
  }

  componentDidMount() {
    const tokenFc = localStorage.getItem('token-fc');

    if (tokenFc) {
      getServiceProviders(tokenFc)
        .then(serviceProviders => {
          this.setState({ serviceProviders, isServiceProvidersLoading: false });

          if (serviceProviders.length === 0) {
            return this.setState({ noServiceProviders: true });
          }

          const serviceProviderIndex = serviceProviders.findIndex(
            ({ key }) => this.props.fournisseur_de_service === key
          );
          const initialIndex =
            serviceProviderIndex >= 0 ? serviceProviderIndex : 0;

          const {
            name: intitule,
            key: fournisseur_de_service,
            description,
          } = serviceProviders[initialIndex];
          this.props.onServiceProviderChange({
            intitule,
            description,
            fournisseur_de_service,
          });

          return this.setState({
            serviceProvidersSelectedIndex: initialIndex,
            noServiceProviders: false,
          });
        })
        .catch(() => this.setState({ isServiceProvidersLoading: false }));
    } else {
      this.setState({ isServiceProvidersLoading: false });
    }
  }

  handleServiceProviderChange(event) {
    const serviceProviderIndex = event.target.value;
    const {
      name: intitule,
      key: fournisseur_de_service,
      description,
    } = this.state.serviceProviders[serviceProviderIndex];

    this.setState({ serviceProvidersSelectedIndex: serviceProviderIndex });
    this.props.onServiceProviderChange({
      intitule,
      description,
      fournisseur_de_service,
    });
  }

  render() {
    const {
      serviceProviders,
      serviceProvidersSelectedIndex,
      noServiceProviders,
      isServiceProvidersLoading,
    } = this.state;

    if (isServiceProvidersLoading) {
      return (
        <div className="form__group">
          <h4>Chargement des fournisseur de service...</h4>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="form__group">
          <h4 id="france-connect">Connexion à FranceConnect Partenaire</h4>
          <p>
            Pour demander l'accès à l'API « impôt particulier », vous devez
            avoir préalablement créé une démarche (fournisseur de service)
            auprès de FranceConnect Partenaire.
            <br />
            Si vous n'en avez pas encore, veuillez créer un{' '}
            <i>fournisseur de service</i> sur{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI}
            >
              FranceConnect Partenaire.
            </a>{' '}
          </p>
          <p>
            <OauthLink href={FRANCE_CONNECT_AUTHORIZE_URI} className="button">
              Se connecter auprès de FranceConnect afin de séléctionner ma
              démarche
            </OauthLink>
          </p>
        </div>
        {serviceProviders.length > 0 && (
          <div className="form__group">
            <label htmlFor="fournisseur_de_service">
              Fournisseurs de service FranceConnect
            </label>
            <select
              onChange={this.handleServiceProviderChange}
              id="fournisseur_de_service"
              value={serviceProvidersSelectedIndex}
            >
              {serviceProviders.map(({ name, key }, index) => (
                <option key={key} value={index}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
        {noServiceProviders && (
          <div className="form__group">
            <div className="notification error">
              Veuillez{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI}
              >
                créer un fournisseur de service
              </a>{' '}
              avant de demander un accès
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

FranceConnectServiceProvider.propTypes = {
  onServiceProviderChange: PropTypes.func.isRequired,
  fournisseur_de_service: PropTypes.string,
};

FranceConnectServiceProvider.defaultProps = {
  fournisseur_de_service: '',
};

export default FranceConnectServiceProvider;

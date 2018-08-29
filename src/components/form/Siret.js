import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { getSiretInformation } from '../../lib/services';
import SearchIcon from '../icons/search';

class Siret extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enseigne: '',
      nom_raison_sociale: '',
      adresse: '',
      activite_principale: '',
      siretNotFound: '',
    };
  }

  componentDidMount() {
    if (this.props.siret) {
      this.debouncedGetSiret(this.props.siret);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.siret !== prevProps.siret) {
      this.debouncedGetSiret(this.props.siret);
    }
  }

  componentWillUnmount() {
    this.debouncedGetSiret.cancel();
  }

  getSiret = siret => {
    const siretWithoutSpaces = siret.replace(/ /g, '');

    getSiretInformation(siretWithoutSpaces)
      .then(({ enseigne, nom_raison_sociale, adresse, activite_principale }) => {
        this.setState({
          enseigne,
          nom_raison_sociale,
          adresse,
          activite_principale,
          siretNotFound: false,
        });
      })
      .catch(() =>
        this.setState({
          enseigne: '',
          nom_raison_sociale: '',
          adresse: '',
          activite_principale: '',
          siretNotFound: true,
        })
      );
  };

  debouncedGetSiret = debounce(this.getSiret, 1000);

  handleSiretChange = event => {
    const siret = event.target.value;

    this.props.handleSiretChange({ siret });
  };

  render() {
    const { disabled, siret } = this.props;
    const {
      enseigne,
      nom_raison_sociale,
      adresse,
      activite_principale,
      siretNotFound,
    } = this.state;

    return (
      <React.Fragment>
        <div className="form__group">
          <label htmlFor="search-siret">
            Rechercher votre organisme avec son SIRET
          </label>
          <div className="search__group">
            <input
              type="text"
              value={siret}
              name="siret"
              id="search-siret"
              disabled={disabled}
              onChange={this.handleSiretChange}
            />
            <button
              className="overlay-button"
              type="button"
              aria-label="Recherche"
              onClick={this.getSiren}
            >
              <SearchIcon id="icon-search" title="Rechercher" />
            </button>
          </div>
        </div>

        {siretNotFound && (
          <div className="form__group">
            <div className="notification error">
              Notre service ne parvient pas à trouver votre SIRET
            </div>
          </div>
        )}

        <div className="form__group">
          <label htmlFor="enseigne">Enseigne</label>
          <input
            type="text"
            id="enseigne"
            disabled
            value={enseigne}
          />
        </div>
        <div className="form__group">
          <label htmlFor="nom_raison_sociale">Raison sociale</label>
          <input
            type="text"
            id="nom_raison_sociale"
            disabled
            value={nom_raison_sociale}
          />
        </div>
        <div className="form__group">
          <label htmlFor="adresse">Adresse</label>
          <input type="text" id="adresse" disabled value={adresse} />
        </div>
        <div className="form__group">
          <label htmlFor="activite_principale">Code NAF</label>
          <input
            type="text"
            id="activite_principale"
            disabled
            value={activite_principale}
          />
        </div>
      </React.Fragment>
    );
  }
}

Siret.propTypes = {
  siret: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  handleSiretChange: PropTypes.func.isRequired,
};

Siret.defaultProps = {
  siret: '',
};

export default Siret;

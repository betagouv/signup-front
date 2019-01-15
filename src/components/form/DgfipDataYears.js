import React from 'react';
import PropTypes from 'prop-types';

const DgfipDataYears = ({
  disabled,
  onChange,
  enrollment: {
    donnees: { dgfip_data_years },
  },
}) => (
  <React.Fragment>
    <div className="information-text">
      <p>
        L'API « impôt particulier » restitue des années de revenus différentes
        selon que la demande soit formulée avant ou après la taxation des
        revenus.
      </p>
      <p>Exemple :</p>
      <table>
        <thead>
          <tr>
            <th>Date de la demande</th>
            <th>dernière année de revenu</th>
            <th>avant-dernière année de revenu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Février 2018</td>
            <td>Revenus 2016</td>
            <td>Revenus 2015</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: 'center' }}>
              Taxation des revenus à compter du mois d'août
            </td>
          </tr>
          <tr>
            <td>Novembre 2018</td>
            <td>Revenus 2017</td>
            <td>Revenus 2016</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="form__group">
      <fieldset className="vertical">
        <label>Sélectionnez les années de revenus souhaitées</label>
        <div className="row">
          <div className="column" style={{ flex: 1 }}>
            <div key="n_moins_1">
              <input
                type="checkbox"
                className="scope__checkbox"
                onChange={onChange}
                name={`donnees.dgfip_data_years.n_moins_1`}
                id={`checkbox-data-year-n_moins_1`}
                disabled={disabled}
                checked={dgfip_data_years['n_moins_1']}
              />
              <label
                htmlFor={`checkbox-scope-n_moins_1`}
                className="label-inline"
              >
                dernière année de revenu
              </label>
            </div>
            <div key="n_moins_2">
              <input
                type="checkbox"
                className="scope__checkbox"
                onChange={onChange}
                name={`donnees.dgfip_data_years.n_moins_2`}
                id={`checkbox-data-year-n_moins_2`}
                disabled={disabled}
                checked={dgfip_data_years['n_moins_2']}
              />
              <label
                htmlFor={`checkbox-scope-n_moins_2`}
                className="label-inline"
              >
                avant-dernière année de revenu
              </label>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </React.Fragment>
);

DgfipDataYears.propTypes = {
  enrollment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DgfipDataYears;

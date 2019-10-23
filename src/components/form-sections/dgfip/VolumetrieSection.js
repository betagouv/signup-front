import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ScrollablePanel } from '../../elements/Scrollable';
import { FormContext } from '../../Form';

const VolumetrieSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: {
        nombre_demandes_annuelle = '',
        pic_demandes_par_heure = '',
        nombre_demandes_mensuelles,
      },
    },
  } = useContext(FormContext);

  if (!nombre_demandes_mensuelles) {
    onChange({
      target: {
        value: Array(12).fill(''),
        name: 'additional_content.nombre_demandes_mensuelles',
      },
    });

    return null;
  }

  return (
    <ScrollablePanel scrollableId="volumetrie">
      <h2>Volumétrie</h2>
      <div className="text-quote">
        <p>
          Connaître les données relatives à la volumétrie et à la saisonnalité
          de votre téléservice nous permet de vous offrir la meilleure qualité
          de service possible. Ces informations sont transmises aux fournisseurs
          de vos données pour prévenir les pics de charges .
        </p>
        <p>
          Conformément aux modalités d’utilisation, nous nous réservons le droit
          de réduire ou couper les appels autorisés au fournisseur de service.
        </p>
      </div>
      <div className="form__group">
        <label htmlFor="nombre_demandes_annuelle">
          Quel est le volume global annuel des demandes de votre téléservice (en
          nombre de demandes par an)&nbsp;?
        </label>
        <input
          type="number"
          min="0"
          onChange={onChange}
          name="additional_content.nombre_demandes_annuelle"
          id="nombre_demandes_annuelle"
          disabled={disabled}
          value={nombre_demandes_annuelle}
        />
      </div>
      <div className="form__group">
        <label htmlFor="pic_demandes_par_heure">
          Quel est le pic de charge (en nombre de demandes par heure)&nbsp;?
        </label>
        <input
          type="number"
          min="0"
          onChange={onChange}
          name="additional_content.pic_demandes_par_heure"
          id="pic_demandes_par_heure"
          disabled={disabled}
          value={pic_demandes_par_heure}
        />
      </div>
      <div className="form__group">
        <label>
          Quelle est la répartition de la charge (en nombre de demandes par
          mois, 0 si le service est fermé)&nbsp;?
        </label>
        <div className="form__group">
          <div className="date_input_row">
            {nombre_demandes_mensuelles.map((nombresDeDemandes, index) => (
              <div
                key={`nombre_demandes_mensuelles.${index}`}
                className="date_input_col"
              >
                <label htmlFor={`nombre_demandes_mensuelles.${index}`}>
                  {moment(index + 1, 'M').format('MMMM')}
                </label>
                <input
                  type="number"
                  min="0"
                  onChange={onChange}
                  name={`additional_content.nombre_demandes_mensuelles.${index}`}
                  id={`nombre_demandes_mensuelles.${index}`}
                  disabled={disabled}
                  value={nombresDeDemandes}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollablePanel>
  );
};

VolumetrieSection.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  enrollment: PropTypes.shape({
    additional_content: PropTypes.object,
  }),
};

export default VolumetrieSection;

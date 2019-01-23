import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserValidatedFranceconnectEnrollments } from '../../lib/services';

class ValidatedFranceconnectEnrollmentsSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validatedFranceconnectEnrollments: [],
      validatedFranceconnectEnrollmentsSelectedIndex: '',
      noValidatedFranceconnectEnrollments: false,
      isValidatedFranceconnectEnrollmentsLoading: true,
    };

    this.handleValidatedFranceconnectEnrollmentChange = this.handleValidatedFranceconnectEnrollmentChange.bind(
      this
    );
  }

  componentDidMount() {
    getUserValidatedFranceconnectEnrollments()
      .then(enrollments => {
        this.setState({
          validatedFranceconnectEnrollments: enrollments,
          isValidatedFranceconnectEnrollmentsLoading: false,
        });

        if (enrollments.length === 0) {
          return this.setState({ noValidatedFranceconnectEnrollments: true });
        }

        const validatedFranceconnectEnrollmentIndex = enrollments.findIndex(
          ({ id }) => this.props.linked_franceconnect_enrollment_id === id
        );
        const initialIndex =
          validatedFranceconnectEnrollmentIndex >= 0
            ? validatedFranceconnectEnrollmentIndex
            : 0;

        const {
          id: linked_franceconnect_enrollment_id,
          demarche: { intitule, description },
          siret,
          contacts,
        } = enrollments[initialIndex];

        this.props.onValidatedFranceconnectEnrollment({
          linked_franceconnect_enrollment_id,
          intitule,
          description,
          siret,
          contacts,
        });

        return this.setState({
          validatedFranceconnectEnrollmentsSelectedIndex: initialIndex,
          noValidatedFranceconnectEnrollments: false,
        });
      })
      .catch(() =>
        this.setState({ isValidatedFranceconnectEnrollmentsLoading: false })
      );
  }

  handleValidatedFranceconnectEnrollmentChange(event) {
    const validatedFranceconnectEnrollmentIndex = event.target.value;

    const {
      id: linked_franceconnect_enrollment_id,
      demarche: { intitule, description },
      siret,
      contacts,
    } = this.state.validatedFranceconnectEnrollments[
      validatedFranceconnectEnrollmentIndex
    ];

    this.setState({
      validatedFranceconnectEnrollmentsSelectedIndex: validatedFranceconnectEnrollmentIndex,
    });
    this.props.onValidatedFranceconnectEnrollment({
      linked_franceconnect_enrollment_id,
      intitule,
      description,
      siret,
      contacts,
    });
  }

  render() {
    const {
      validatedFranceconnectEnrollments,
      validatedFranceconnectEnrollmentsSelectedIndex,
      noValidatedFranceconnectEnrollments,
      isValidatedFranceconnectEnrollmentsLoading,
    } = this.state;

    if (isValidatedFranceconnectEnrollmentsLoading) {
      return (
        <div className="form__group">
          <h4 id="franceconnect-enrollment">
            Association à votre demande Franceconnect
          </h4>
          <p>Chargement de vos demandes Franceconnect...</p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="form__group">
          <h4 id="franceconnect-enrollment">
            Association à votre demande Franceconnect
          </h4>
          <p>
            Pour demander l'accès à l'API « impôt particulier », vous devez
            avoir préalablement obtenu un accès à Franceconnect.
          </p>
        </div>
        {validatedFranceconnectEnrollments.length > 0 && (
          <div className="form__group">
            <label htmlFor="validated_franceconnect_enrollments">
              Vos demandes Franceconnect validées
            </label>
            <select
              onChange={this.handleValidatedFranceconnectEnrollmentChange}
              id="validated_franceconnect_enrollments"
              value={validatedFranceconnectEnrollmentsSelectedIndex}
            >
              {validatedFranceconnectEnrollments.map(
                ({ demarche: { intitule: name }, id: key }, index) => (
                  <option key={key} value={index}>
                    {name}
                  </option>
                )
              )}
            </select>
          </div>
        )}
        {noValidatedFranceconnectEnrollments && (
          <div className="form__group">
            <div className="notification error">
              Veuillez{' '}
              <Link to={'/franceconnect'}>
                demander votre accès à Franceconnect
              </Link>{' '}
              avant de continuer cette demande.
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

ValidatedFranceconnectEnrollmentsSelector.propTypes = {
  onValidatedFranceconnectEnrollment: PropTypes.func.isRequired,
  linked_franceconnect_enrollment_id: PropTypes.string,
};

ValidatedFranceconnectEnrollmentsSelector.defaultProps = {
  linked_franceconnect_enrollment_id: '',
};

export default ValidatedFranceconnectEnrollmentsSelector;

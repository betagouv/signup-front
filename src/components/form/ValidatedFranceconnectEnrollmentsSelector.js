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

        const { id: linked_franceconnect_enrollment_id } = enrollments[
          initialIndex
        ];

        this.props.onValidatedFranceconnectEnrollment({
          target: {
            name: 'linked_franceconnect_enrollment_id',
            value: linked_franceconnect_enrollment_id,
          },
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
    } = this.state.validatedFranceconnectEnrollments[
      validatedFranceconnectEnrollmentIndex
    ];

    this.setState({
      validatedFranceconnectEnrollmentsSelectedIndex: validatedFranceconnectEnrollmentIndex,
    });
    this.props.onValidatedFranceconnectEnrollment({
      target: {
        name: 'linked_franceconnect_enrollment_id',
        value: linked_franceconnect_enrollment_id,
      },
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
            Association à votre demande FranceConnect
          </h4>
          <p>Chargement de vos demandes FranceConnect...</p>
        </div>
      );
    }

    return (
      <React.Fragment>
        {validatedFranceconnectEnrollments.length > 0 && (
          <div className="form__group">
            <label htmlFor="validated_franceconnect_enrollments">
              Vos demandes FranceConnect validées
            </label>
            <select
              onChange={this.handleValidatedFranceconnectEnrollmentChange}
              id="validated_franceconnect_enrollments"
              value={validatedFranceconnectEnrollmentsSelectedIndex}
            >
              {validatedFranceconnectEnrollments.map(
                ({ intitule: name, id: key }, index) => (
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
              <p>
                Pour demander l'accès à une API FranceConnectée, vous devez
                avoir préalablement obtenu un accès à FranceConnect.
              </p>
              <p>
                Veuillez{' '}
                <Link to={'/franceconnect'}>
                  demander votre accès à FranceConnect
                </Link>{' '}
                avant de continuer cette demande.
              </p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

ValidatedFranceconnectEnrollmentsSelector.propTypes = {
  onValidatedFranceconnectEnrollment: PropTypes.func.isRequired,
  linked_franceconnect_enrollment_id: PropTypes.number,
};

ValidatedFranceconnectEnrollmentsSelector.defaultProps = {
  linked_franceconnect_enrollment_id: null,
};

export default ValidatedFranceconnectEnrollmentsSelector;

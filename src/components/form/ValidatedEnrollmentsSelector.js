import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserValidatedEnrollments } from '../../lib/services';
import { TARGET_API_LABELS } from '../../lib/api';

class ValidatedEnrollmentsSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validatedEnrollments: [],
      validatedEnrollmentsSelectedIndex: '',
      noValidatedEnrollments: false,
      isValidatedEnrollmentsLoading: true,
    };

    this.handleValidatedEnrollmentChange = this.handleValidatedEnrollmentChange.bind(
      this
    );
  }

  componentDidMount() {
    getUserValidatedEnrollments(this.props.linkedTargetApi)
      .then(enrollments => {
        this.setState({
          validatedEnrollments: enrollments,
          isValidatedEnrollmentsLoading: false,
        });

        if (enrollments.length === 0) {
          return this.setState({ noValidatedEnrollments: true });
        }

        const validatedEnrollmentIndex = enrollments.findIndex(
          ({ id }) => this.props.previous_enrollment_id === id
        );
        const initialIndex =
          validatedEnrollmentIndex >= 0 ? validatedEnrollmentIndex : 0;

        const { id: previous_enrollment_id } = enrollments[initialIndex];

        this.props.onValidatedEnrollment({
          target: {
            name: 'previous_enrollment_id',
            value: previous_enrollment_id,
          },
        });

        return this.setState({
          validatedEnrollmentsSelectedIndex: initialIndex,
          noValidatedEnrollments: false,
        });
      })
      .catch(() => this.setState({ isValidatedEnrollmentsLoading: false }));
  }

  handleValidatedEnrollmentChange(event) {
    const validatedEnrollmentIndex = event.target.value;

    const { id: previous_enrollment_id } = this.state.validatedEnrollments[
      validatedEnrollmentIndex
    ];

    this.setState({
      validatedEnrollmentsSelectedIndex: validatedEnrollmentIndex,
    });
    this.props.onValidatedEnrollment({
      target: {
        name: 'previous_enrollment_id',
        value: previous_enrollment_id,
      },
    });
  }

  render() {
    const {
      validatedEnrollments,
      validatedEnrollmentsSelectedIndex,
      noValidatedEnrollments,
      isValidatedEnrollmentsLoading,
    } = this.state;

    const { linkedTargetApi, enrollmentTargetApi } = this.props;

    if (isValidatedEnrollmentsLoading) {
      return (
        <div className="form__group">
          <h4 id="franceconnect-enrollment">
            Association à votre demande{' '}
            <b>{TARGET_API_LABELS[linkedTargetApi]}</b>
          </h4>
          <p>
            Chargement de vos demandes{' '}
            <b>{TARGET_API_LABELS[linkedTargetApi]}</b>...
          </p>
        </div>
      );
    }

    return (
      <>
        {validatedEnrollments.length > 0 && (
          <div className="form__group">
            <label htmlFor="validated_franceconnect_enrollments">
              Nom de la démarche <b>{TARGET_API_LABELS[linkedTargetApi]}</b>
              &nbsp;:
            </label>
            <select
              onChange={this.handleValidatedEnrollmentChange}
              id="validated_franceconnect_enrollments"
              value={validatedEnrollmentsSelectedIndex}
            >
              {validatedEnrollments.map(
                ({ intitule: name, id: key }, index) => (
                  <option key={key} value={index}>
                    {name}
                  </option>
                )
              )}
            </select>
          </div>
        )}
        {noValidatedEnrollments && (
          <div className="form__group">
            <div className="notification error">
              <p>
                Pour demander l'accès à{' '}
                <b>{TARGET_API_LABELS[enrollmentTargetApi]}</b>, vous devez
                avoir préalablement obtenu un accès à{' '}
                <b>{TARGET_API_LABELS[linkedTargetApi]}</b>.
              </p>
              <p>
                Veuillez{' '}
                <Link to={`/${linkedTargetApi.replace(/_/g, '-')}`}>
                  demander votre accès à{' '}
                  <b>{TARGET_API_LABELS[linkedTargetApi]}</b>
                </Link>{' '}
                avant de continuer cette demande.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}

ValidatedEnrollmentsSelector.propTypes = {
  onValidatedEnrollment: PropTypes.func.isRequired,
  previous_enrollment_id: PropTypes.number,
  linkedTargetApi: PropTypes.string,
  enrollmentTargetApi: PropTypes.string,
};

ValidatedEnrollmentsSelector.defaultProps = {
  previous_enrollment_id: null,
};

export default ValidatedEnrollmentsSelector;

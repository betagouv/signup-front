import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { isObject, omitBy, merge, zipObjectDeep } from 'lodash';
import Linkify from 'linkifyjs/react';

import { getUserEnrollment } from '../lib/services';

import ActionButtons from './form/ActionButtons';
import ActivityFeed from './form/ActivityFeed';

export const FormContext = React.createContext();

class Form extends React.Component {
  constructor(props) {
    super(props);

    const { target_api } = props;

    this.state = {
      errorMessages: [],
      successMessages: [],
      isUserEnrollmentLoading: true,
      enrollment: {
        acl: {
          update: true,
          send_application: true, // Enable edition for new enrollment (ie. enrollment has no id)
        },
        events: [],
        target_api,
        additional_content: {},
      },
    };
  }

  componentDidMount() {
    const id = this.props.enrollmentId;

    if (!id) {
      return this.setState({ isUserEnrollmentLoading: false });
    }

    getUserEnrollment(id)
      .then(enrollment => {
        this.setState(({ enrollment: prevEnrollment }) => ({
          isUserEnrollmentLoading: false,
          enrollment: merge(
            {},
            prevEnrollment,
            omitBy(enrollment, e => e === null) // do not merge null properties, keep empty string instead to avoid controlled input to switch to uncontrolled input
          ),
        }));
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/');
        }
      });
  }

  updateEnrollment = enrollment => {
    if (!this.state.enrollment.id && enrollment.id) {
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${
          window.location.pathname.endsWith('/') ? '' : '/'
        }${enrollment.id}`
      );
    }

    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge(
        {},
        prevEnrollment,
        omitBy(enrollment, e => e === null) // do not merge null properties, keep empty string instead to avoid controlled input to switch to uncontrolled input
      ),
    }));
  };

  handleChange = ({
    target: { type = null, checked = null, value: inputValue, name },
  }) => {
    const value = type === 'checkbox' ? checked : inputValue;

    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge(
        {},
        prevEnrollment,
        zipObjectDeep([`${name}`], [value])
      ),
    }));
  };

  handleDocumentsChange = documentsToUpload => {
    this.setState(({ enrollment: prevEnrollment }) => ({
      enrollment: merge({}, prevEnrollment, {
        documents_attributes: documentsToUpload,
      }),
    }));
  };

  handleSubmit = ({
    errorMessages = [],
    successMessages = [],
    redirectToHome = false,
  }) => {
    if (
      redirectToHome &&
      isObject(this.props.history.location.state) &&
      this.props.history.location.state.fromList
    ) {
      return this.props.history.goBack();
    }

    if (redirectToHome) {
      return this.props.history.push('/');
    }

    return this.setState({ errorMessages, successMessages });
  };

  render() {
    const {
      enrollment,
      errorMessages,
      successMessages,
      isUserEnrollmentLoading,
    } = this.state;

    const { acl, events } = enrollment;

    return (
      <>
        {!isUserEnrollmentLoading && acl.update && (
          <div className="notification info">
            Pensez à sauvegarder régulièrement votre demande en brouillon.
          </div>
        )}

        {events.length > 0 && (
          <>
            <h4>Activité</h4>
            <ActivityFeed events={events} />
          </>
        )}

        <FormContext.Provider
          value={{
            disabled: !acl.send_application,
            onChange: this.handleChange,
            onDocumentsChange: this.handleDocumentsChange,
            enrollment,
            isUserEnrollmentLoading,
          }}
        >
          {this.props.children}
        </FormContext.Provider>

        {successMessages.map(successMessage => (
          <div key={successMessage} className="notification success">
            <Linkify>{successMessage}</Linkify>
          </div>
        ))}
        {errorMessages.map(errorMessage => (
          <div key={errorMessage} className="notification error">
            <Linkify>{errorMessage}</Linkify>
          </div>
        ))}

        <ActionButtons
          enrollment={this.state.enrollment}
          updateEnrollment={this.updateEnrollment}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

Form.propTypes = {
  enrollmentId: PropTypes.string,
  target_api: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        fromList: PropTypes.bool,
      }),
    }),
  }),
};

Form.defaultProps = {
  enrollmentId: null,
};

export default withRouter(Form);

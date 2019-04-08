import React from 'react';
import PropTypes from 'prop-types';
import { last, sortBy } from 'lodash';
import moment from 'moment';
import CheckCircleIcon from '../icons/check-circle';
import ErrorOutlineIcon from '../icons/error-outline';
import ErrorIcon from '../icons/error';
import WarningIcon from '../icons/warning';
import './ActivityFeed.css';

class ActivityFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
    };
  }

  render() {
    const { showDetails } = this.state;

    const { events } = this.props;

    const eventNameToDisplayableContent = {
      asked_for_modification: {
        icon: <WarningIcon color={'var(--orange)'} />,
        label: 'a demandé des modifications',
      },
      created: {
        icon: <ErrorOutlineIcon color={'var(--blue)'} />,
        label: 'a créé la demande',
      },
      submitted: {
        icon: <ErrorOutlineIcon color={'var(--blue)'} />,
        label: 'a soumis la demande',
      },
      validated: {
        icon: <CheckCircleIcon color={'var(--green)'} />,
        label: 'a validé la demande',
      },
      updated_contacts: {
        icon: <ErrorOutlineIcon color={'var(--blue)'} />,
        label: 'a mis à jour les contacts',
      },
      updated: {
        icon: <ErrorOutlineIcon color={'var(--blue)'} />,
        label: 'a mis à jour la demande',
      },
      refused: {
        icon: <ErrorIcon color={'var(--red)'} />,
        label: 'a refusé la demande',
      },
    };

    let eventsToDisplay = sortBy(events, 'updated_at');

    if (!showDetails && events.length > 0) {
      eventsToDisplay = [last(eventsToDisplay)];
    }

    return (
      <>
        <div className="event-head">
          <h4>Activité</h4>
          <button
            className="toogle-detail"
            onClick={() => this.setState({ showDetails: !showDetails })}
          >
            {showDetails ? "Cacher l'historique" : "Voir l'historique"}
          </button>
        </div>
        {eventsToDisplay.map(
          ({ id, comment, name, updated_at, user: { email } }) => (
            <div key={id} className="event-item">
              <div className="event-icon">
                {eventNameToDisplayableContent[name].icon}
              </div>
              <div className="event-content">
                <div className="event-head">
                  <div>
                    <strong>{email} </strong>
                    {eventNameToDisplayableContent[name].label}
                  </div>
                  <div className="event-date">
                    {moment(updated_at).calendar()}
                  </div>
                </div>
                {comment && <div className="event-comment">{comment}</div>}
              </div>
            </div>
          )
        )}
      </>
    );
  }
}

ActivityFeed.propTypes = {
  events: PropTypes.array,
};

ActivityFeed.defaultProps = {
  events: [],
};

export default ActivityFeed;

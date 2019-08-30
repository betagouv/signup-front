import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, last, sortBy } from 'lodash';
import moment from 'moment';
import Linkify from 'linkifyjs/react';
import CheckCircleIcon from '../icons/check-circle';
import ErrorOutlineIcon from '../icons/error-outline';
import ErrorIcon from '../icons/error';
import WarningIcon from '../icons/warning';
import NotificationsIcon from '../icons/notifications';
import './ActivityFeed.css';
import { getChangelog } from '../../lib/utils';

const eventNameToDisplayableContent = {
  asked_for_modification: {
    icon: <WarningIcon color={'var(--orange)'} />,
    label: 'a demandé des modifications',
  },
  notified: {
    icon: <NotificationsIcon color={'var(--orange)'} />,
    label: 'a écrit',
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
  // This action is not available anymore but we keep this to display remaining
  // updated_contacts events in the activity feed
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

export const EventItem = ({ comment, name, updated_at, email, diff }) => {
  const [showDiff, setShowDiff] = useState(false);
  const changelog = getChangelog(diff);

  return (
    <div className="event-item">
      <div className="event-icon">
        {eventNameToDisplayableContent[name].icon}
      </div>
      <div className="event-content">
        <div className="event-head">
          <div>
            <strong>{email} </strong>
            {eventNameToDisplayableContent[name].label}
            {!isEmpty(diff) && (
              <button
                className="toogle-detail"
                onClick={() => setShowDiff(!showDiff)}
              >
                (voir détails)
              </button>
            )}
          </div>
          <div className="event-date">{moment(updated_at).calendar()}</div>
        </div>
        {comment && (
          <div className="event-comment">
            <Linkify>{comment}</Linkify>
          </div>
        )}
        {!isEmpty(changelog) && showDiff && (
          <div className="event-comment">
            {changelog.map(log => (
              <p key={log.slice(20)}>{log}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  comment: PropTypes.string,
  name: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  diff: PropTypes.object,
};

EventItem.defaultProps = {
  comment: '',
  diff: {},
};

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
          ({ id, comment, name, updated_at, user: { email }, diff }) => (
            <EventItem
              key={id}
              comment={comment}
              name={name}
              updated_at={updated_at}
              email={email}
              diff={diff}
            />
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

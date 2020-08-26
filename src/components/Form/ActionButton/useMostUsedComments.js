import { useState, useEffect } from 'react';
import { getMostUsedComments } from '../../../lib/services';

const actionToEventName = {
  notify: 'notified',
  review_application: 'asked_for_modification',
  refuse_application: 'refused',
  validate_application: 'validated',
};

const useMostUsedComments = (selectedAction, targetApi) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchGetMostUsedComments() {
      if (!selectedAction || !targetApi) return null;

      const comments = await getMostUsedComments({
        eventName: actionToEventName[selectedAction],
        targetApi,
      });

      setComments(comments);
    }

    fetchGetMostUsedComments();
  }, [selectedAction, targetApi]);

  return comments;
};

export default useMostUsedComments;

import React from 'react';
import { bad, good } from './styles.scss';

const renderFeedback = (didStartTyping, feedback, score) => {
  if (!didStartTyping) return null;

  let scoreFeedback;
  let feedbackColor;

  const warning = feedback.get('warning');

  switch (score) {
    case 1:
      scoreFeedback = 'Very weak';
      feedbackColor = bad;
      break;
    case 2:
      scoreFeedback = 'Too weak';
      feedbackColor = bad;
      break;
    case 3:
      scoreFeedback = 'Could be stronger, but good enough';
      feedbackColor = good;
      break;
    case 4:
      scoreFeedback = 'Awesome!';
      feedbackColor = good;
      break;
    case 0:
    default:
      scoreFeedback = '';
  }

  if (warning) return <span className={bad}>{warning}</span>;
  if (scoreFeedback) return <span className={feedbackColor}>{scoreFeedback}</span>;

  return null;
};

export default renderFeedback;

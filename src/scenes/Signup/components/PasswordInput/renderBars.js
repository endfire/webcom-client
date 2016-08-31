import React from 'react';
import { range } from 'lodash';
import { bars } from './styles.scss';

const renderBars = (didStartTyping, score) => {
  if (!didStartTyping) return null;

  let barColor;

  const BAR_WIDTH = 6;
  const LOW = '#E64B42';
  const DECENT = '#EADA3B';
  const GOOD = '#35CF51';

  const barStyle = (color, height, margin) => ({
    position: 'absolute',
    width: `${BAR_WIDTH}px`,
    height: `${height}px`,
    borderRadius: `${BAR_WIDTH / 2}px`,
    background: color,
    bottom: `${BAR_WIDTH / 2}px`,
    right: 0,
    marginRight: `${margin}px`,
  });

  if (score <= 1) barColor = LOW;
  if (score === 2) barColor = DECENT;
  if (score >= 3) barColor = GOOD;

  return (
    <span className={bars}>
      {range(score).map((s, idx) => {
        const height = BAR_WIDTH * (s + 1);
        const margin = (score - (idx + 1)) * (BAR_WIDTH * 1.5);

        return (
          <div key={`bar-${s + 1}`} style={barStyle(barColor, height, margin)}></div>
        );
      })}
    </span>
  );
};

export default renderBars;

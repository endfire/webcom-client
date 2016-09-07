import React from 'react';
import styles from './welcome.scss';

const Welcome = () => (
  <div className={styles.wrapper}>
    <h3>Welcome to your Webcom dashboard</h3>
    <p>
      You can manage/add brand listings,
      add/remove key people for your company,
      and edit your company settings.
    </p>
  </div>
);

export default Welcome;

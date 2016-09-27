import React from 'react';
import styles from './styles.scss';

const SubmitSuccess = () => (
  <div className={styles.wrapper}>
    <div className={styles.heading}>
      <h3>Thank you for your submission!</h3>
    </div>
    <div className={styles.container}>
      <p>
        Please check your email for your receipt.
        If you have any questions please contact Webcom Communications at (720) 528-3770.
      </p>
    </div>
  </div>
);

export default SubmitSuccess;

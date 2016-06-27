import React, { Component } from 'react';
import styles from './styles.scss';

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = { progress: 0 };
    this.advance = this.advance.bind(this);
  }

  advance(amount) {
    const { progress } = this.state;
    const incrementedAmount = progress + amount;

    this.setState({
      progress: incrementedAmount > 100 ? 100 : incrementedAmount,
    });
  }

  render() {
    return <div className={styles.loader}></div>;
  }
}

export default Loader;

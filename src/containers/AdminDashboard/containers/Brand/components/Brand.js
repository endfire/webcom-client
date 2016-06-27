import React, { Component, PropTypes } from 'react';
import Navbar from './Navbar';

class Brand extends Component {
  constructor(props) {
    super(props);

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { fetchBrand, params: { id } } = this.props;
    return fetchBrand(id);
  }

  render() {
    const { children, brand } = this.props;

    return (
      <div>
        <Navbar brand={brand} />
        {children}
      </div>
    );
  }
}

Brand.propTypes = {
  params: PropTypes.object,
  fetchBrand: PropTypes.func,
  brand: PropTypes.object,
  children: PropTypes.any,
};

export default Brand;

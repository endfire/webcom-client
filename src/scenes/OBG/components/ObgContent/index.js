import React, { PropTypes, Component } from 'react';
import Select from 'react-select';
import { ObgList } from './components';

class ObgContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      categoryOptions: props.categoryOptions,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.renderOBG = this.renderOBG.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleSelectChange(value) {
    if (value) {
      this.setState({ category: value.value });
      this.props.fetchListings(value.value);
      this.props.fetchAds(value.value);
    } else {
      this.setState({ category: '' });
    }
  }

  renderContent() {
    const {
      brand,
      listings,
      ads,
      fetchAds,
      fetchListings,
    } = this.props;

    return (
      this.state.category === ''
        ? <div></div>
        : <div>
          <ObgList
            brand={brand}
            listings={listings}
            ads={ads}
            category={this.state.category}
            fetchAds={fetchAds}
            fetchListings={fetchListings}
          />
        </div>
    );
  }

  renderOBG() {
    const { handleSelectChange } = this;

    return (
      <div>
        <label htmlFor="name">Select a product or service to see its providers.</label><br />
        <Select
          name="category"
          value={this.state.category}
          options={this.state.categoryOptions}
          onChange={handleSelectChange}
          placeholder="Please select a product or service."
        />
        {this.renderContent()}
      </div>
    );
  }

  render() {
    const { renderOBG } = this;
    const { brand } = this.props;

    // Need link to login and signup
    return (
      <div>
        {brand ? renderOBG() : 'Loading...'}
      </div>
    );
  }
}

ObgContent.propTypes = {
  brand: PropTypes.object,
  categoryOptions: PropTypes.array,
  listings: PropTypes.object,
  ads: PropTypes.object,
  fetchListings: PropTypes.func,
  fetchAds: PropTypes.func,
};

export default ObgContent;

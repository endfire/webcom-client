import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import ListView from '../../../components/ListView';
import BrandListItem from './BrandListItem';
import AddBrandModal from './AddBrandModal';
import classNames from 'classnames';

const BrandList = ({ brands, router }) => {
  const classes = classNames('container', 'm-t-1');

  return (
    <div className={classes}>
      <AddBrandModal />
      <ListView>
        {brands.map(brand => {
          const { id } = brand;
          const navigate = () => router.push(`/admin/brands/${id}`);

          return (
            <BrandListItem
              key={id}
              brand={brand}
              navigate={navigate}
            />
          );
        })}
      </ListView>
    </div>
  );
};

BrandList.propTypes = {
  brands: PropTypes.array,
  router: PropTypes.object,
};

export default withRouter(BrandList);

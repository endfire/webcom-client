import React, { PropTypes } from 'react';
import DeleteButton from '../../../ui/DeleteButton';
import ListView from '../../../components/ListView';
import ListItem from '../../../components/ListItem';
import AddBrandModal from './AddBrandModal';

const BrandList = ({ brands }) => (
  <div className="container m-t-1">
    <AddBrandModal />
    <ListView>
      {brands.map(brand => {
        const text = `Are you sure to want to delete ${brand.name}?`;

        const deleteButton = (
          <DeleteButton
            onSuccess={() => alert('Awwww boo')}
            onCancel="close"
            text={text}
          />
        );

        return (
          <ListItem
            key={brand.id}
            icon="building"
            left={[brand.name]}
            right={[deleteButton]}
          />
        );
      })}
    </ListView>
  </div>
);

BrandList.propTypes = {
  brands: PropTypes.array,
};

export default BrandList;

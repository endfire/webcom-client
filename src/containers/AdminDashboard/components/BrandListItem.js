import React, { PropTypes } from 'react';
import ListItem from '../../../components/ListItem';
import DeleteButton from '../../../ui/DeleteButton';

const BrandListItem = ({ brand, navigate }) => {
  const { name } = brand;
  const text = `Are you sure to want to delete ${name}?`;

  const brandName = (
    <h5 onClick={navigate}>{name}</h5>
  );

  const deleteButton = (
    <DeleteButton
      onSuccess={() => alert('Awwww boo')}
      onCancel="close"
      text={text}
    />
  );

  return (
    <ListItem
      icon="building"
      left={[brandName]}
      right={[deleteButton]}
    />
  );
};

BrandListItem.propTypes = {
  brand: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  navigate: PropTypes.func.isRequired,
};

export default BrandListItem;

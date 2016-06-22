import React from 'react';
import { Button } from 'reactstrap';
import DeleteButton from '../../../ui/DeleteButton';
import ListView from '../../../components/ListView';
import ListItem from '../../../components/ListItem';

const brands = [{
  id: 1,
  name: 'Antennas',
}, {
  id: 2,
  name: 'LED',
}, {
  id: 3,
  name: 'Battery',
}, {
  id: 4,
  name: 'IoT',
}];

const BrandList = () => (
  <div>
    <Button color="secondary">Create a new brand</Button>
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

export default BrandList;

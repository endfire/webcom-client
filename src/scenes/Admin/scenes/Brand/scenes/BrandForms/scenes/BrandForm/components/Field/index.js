import React, { PropTypes } from 'react';
import { EditFieldModal, DeleteFieldModal } from '../';
import styles from './styles.scss';

const Field = ({ field, updateField, deleteField, isUpdateLoading, isDeleteLoading }) => (
  <div className={styles.field}>
    <div className={styles.fieldHeader}>
      <h3>{field.get('label')}</h3>
      <EditFieldModal
        field={field}
        updateField={updateField}
        isUpdateLoading={isUpdateLoading}
      />
      <DeleteFieldModal
        fieldID={field.get('id')}
        deleteField={deleteField}
        isDeleteLoading={isDeleteLoading}
      />
    </div>
  </div>
);

Field.propTypes = {
  field: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  deleteField: PropTypes.func.isRequired,
  isUpdateLoading: PropTypes.bool,
  isDeleteLoading: PropTypes.bool,
};

export default Field;

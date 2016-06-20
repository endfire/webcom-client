import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Modal = ({ open, children }) => {
  const classes = classNames('modal', 'fade', { in: open });
  const style = {
    display: open ? 'block' : 'none',
  };

  return (
    <div className={classes} style={style}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.any,
};

export default Modal;

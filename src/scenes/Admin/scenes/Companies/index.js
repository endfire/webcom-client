import React, { PropTypes } from 'react';
import { Container } from 'paintcan';

const Companies = ({ children }) => (
  <div>
    <Container>
      need subnavbar
    </Container>
    {children}
  </div>
);

export default Companies;

Companies.propTypes = {
  children: PropTypes.any,
};

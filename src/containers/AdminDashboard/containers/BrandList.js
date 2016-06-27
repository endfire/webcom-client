import BrandList from '../components/BrandList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const brands = [{
  id: '1',
  name: 'Antennas',
}, {
  id: '2',
  name: 'LED',
}, {
  id: '3',
  name: 'Battery',
}, {
  id: '4',
  name: 'IoT',
}];

const mapStateToProps = () => ({ brands });

export default withRouter(connect(mapStateToProps)(BrandList));

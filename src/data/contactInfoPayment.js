import { states } from 'us';
import countries from 'i18n-iso-countries';

const { keys } = Object;

const statesArray = keys(states);
const countriesArray = keys(countries.getNames('en'))
  .map(country => countries[country]);

export default [{
  type: 'text',
  label: 'Company',
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact Title',
}, {
  type: 'text',
  label: 'Address',
  isRequired: true,
}, {
  type: 'text',
  label: 'Address 2',
}, {
  type: 'text',
  label: 'City',
}, {
  type: 'select',
  label: 'State',
  options: statesArray,
}, {
  type: 'select',
  label: 'Country',
  options: countriesArray,
  isRequired: true,
}, {
  type: 'text',
  label: 'Phone',
  isRequired: true,
}, {
  type: 'text',
  label: 'Fax',
}, {
  type: 'text',
  label: 'Website',
}];

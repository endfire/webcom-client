import { states } from 'us';
import countries from 'i18n-iso-countries';

const { keys } = Object;

const statesArray = keys(states);
const countriesObject = countries.getNames('en');
const countriesArray = keys(countriesObject).map(country => countriesObject[country]);

export default [{
  type: 'text',
  label: 'Company',
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact Title',
  isRequired: false,
}, {
  type: 'text',
  label: 'Address',
  isRequired: true,
}, {
  type: 'text',
  label: 'Address 2',
  isRequired: false,
}, {
  type: 'text',
  label: 'City',
  isRequired: true,
}, {
  type: 'select',
  label: 'State',
  options: statesArray,
  isRequired: true,
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
  isRequired: false,
}, {
  type: 'text',
  label: 'Website',
  isRequired: false,
}];

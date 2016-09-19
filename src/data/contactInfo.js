import { states } from 'us';
import countries from 'i18n-iso-countries';

const { keys } = Object;

const statesArray = keys(states);
const countriesObject = countries.getNames('en');
const countriesArray = keys(countriesObject).map(country => countriesObject[country]);

export default [{
  type: 'text',
  label: 'Company',
  placeholder: 'Vandelay Industries',
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact First Name',
  placeholder: 'John',
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact Last Name',
  placeholder: 'Doe',
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact Title',
  placeholder: 'Program Manager',
  isRequired: false,
}, {
  type: 'text',
  label: 'Address',
  placeholder: '123 Maple Street',
  isRequired: true,
}, {
  type: 'text',
  label: 'Address 2',
  isRequired: false,
}, {
  type: 'text',
  label: 'City',
  placeholder: 'Anytown',
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
  placeholder: '123-456-7890',
  isRequired: true,
}, {
  type: 'text',
  label: 'Fax',
  placeholder: '123-456-7890',
  isRequired: false,
}, {
  type: 'text',
  label: 'Email',
  placeholder: 'johndoe@vandelay.com',
  isRequired: true,
}, {
  type: 'text',
  label: 'Website',
  placeholder: 'http://www.vandelay.com',
  isRequired: false,
}];

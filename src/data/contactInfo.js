import { states } from 'us';
import countries from 'i18n-iso-countries';

const { keys } = Object;

const statesArray = keys(states);
const countriesObject = countries.getNames('en');
const countriesArray = keys(countriesObject).map(country => countriesObject[country]);

export default [{
  type: 'text',
  label: 'Contact First Name',
  placeholder: 'John',
  priority: 1,
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact Last Name',
  placeholder: 'Doe',
  priority: 2,
  isRequired: true,
}, {
  type: 'text',
  label: 'Contact Title',
  placeholder: 'Program Manager',
  priority: 3,
  isRequired: false,
}, {
  type: 'text',
  label: 'Company',
  placeholder: 'Vandelay Industries',
  priority: 4,
  isRequired: true,
}, {
  type: 'text',
  label: 'Address',
  placeholder: '123 Maple Street',
  priority: 5,
  isRequired: true,
}, {
  type: 'text',
  label: 'Address 2',
  priority: 6,
  isRequired: false,
}, {
  type: 'text',
  label: 'City',
  placeholder: 'Anytown',
  priority: 7,
  isRequired: true,
}, {
  type: 'select',
  label: 'State',
  options: statesArray,
  priority: 8,
  isRequired: true,
}, {
  type: 'select',
  label: 'Country',
  options: countriesArray,
  priority: 9,
  isRequired: true,
}, {
  type: 'text',
  label: 'Phone',
  placeholder: '123-456-7890',
  priority: 10,
  isRequired: true,
}, {
  type: 'text',
  label: 'Fax',
  placeholder: '123-456-7890',
  priority: 11,
  isRequired: false,
}, {
  type: 'text',
  label: 'Email',
  placeholder: 'johndoe@vandelay.com',
  priority: 12,
  isRequired: true,
}, {
  type: 'text',
  label: 'Website',
  placeholder: 'http://www.vandelay.com',
  priority: 13,
  isRequired: false,
}];

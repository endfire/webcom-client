import contactInfo from './contactInfo';

export const withPayment = {
  id: '1',
  name: 'With a payment option',
  payment: true,
  fields: contactInfo,
};

export const withNoPayment = {
  id: '2',
  name: 'With no payment option',
  payment: false,
  fields: contactInfo,
};

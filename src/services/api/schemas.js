import { MANY, BELONGS, ONE } from '../../constants/relationships';
import * as types from '../../constants/entities';

const getRelationship = (type, relationship, inverse) => ({
  [type]: relationship,
  inverse,
});

export default {
  [types.USER]: {
    attributes: {
      name: true,
      email: true,
      password: true,
      role: true,
    },
  },
  [types.COMPANY]: {
    attributes: {
      name: true,
      street: true,
      city: true,
      state: true,
      zip: true,
      phone: true,
      url: true,
      email: true,
      description: true,
      password: true,
      approved: true,
    },
    relationships: {
      listings: getRelationship(MANY, types.LISTING, 'company'),
      ads: getRelationship(MANY, types.AD, 'company'),
      people: getRelationship(MANY, types.PERSON, 'company'),
    },
  },
  [types.LISTING]: {
    attributes: {
      brand: true,
      brandId: true,
    },
    relationships: {
      company: getRelationship(BELONGS, types.COMPANY, 'listings'),
      categories: getRelationship(MANY, types.CATEGORY, 'listings'),
    },
  },
  [types.AD]: {
    attributes: {
      brand: true,
      brandId: true,
      image: true,
      url: true,
      start: true,
      end: true,
      priority: true,
    },
    relationships: {
      company: getRelationship(BELONGS, types.COMPANY, 'ads'),
      categories: getRelationship(MANY, types.CATEGORY, 'ads'),
    },
  },
  [types.PERSON]: {
    attributes: {
      name: true,
      email: true,
      phone: true,
      job: true,
    },
    relationships: {
      company: getRelationship(BELONGS, types.COMPANY, 'people'),
    },
  },
  [types.BRAND]: {
    attributes: {
      name: true,
      image: true,
      background: true,
      text: true,
      secondary: true,
      obg: true,
    },
    relationships: {
      forms: getRelationship(MANY, types.FORM, 'brand'),
      categories: getRelationship(MANY, types.CATEGORY, 'brand'),
    },
  },
  [types.CATEGORY]: {
    attributes: {
      name: true,
      heading: true,
    },
    relationships: {
      brand: getRelationship(BELONGS, types.BRAND, 'categories'),
      listings: getRelationship(MANY, types.LISTING, 'categories'),
      ads: getRelationship(MANY, types.AD, 'categories'),
    },
  },
  [types.FORM]: {
    attributes: {
      name: true,
      published: true,
    },
    relationships: {
      brand: getRelationship(BELONGS, types.BRAND, 'forms'),
      submissions: getRelationship(MANY, types.SUBMISSION, 'form'),
      fields: getRelationship(MANY, types.FIELD, 'form'),
      payment: getRelationship(ONE, types.PAYMENT, 'form'),
    },
  },
  [types.SUBMISSION]: {
    attributes: {
      fields: true,
      items: true,
      payment: true,
    },
    relationships: {
      form: getRelationship(BELONGS, types.FORM, 'submissions'),
    },
  },
  [types.FIELD]: {
    attributes: {
      label: true,
      placeholder: true,
      type: true,
      value: true,
      options: true,
      isRequired: true,
    },
    relationships: {
      form: getRelationship(BELONGS, types.FORM, 'fields'),
    },
  },
  [types.PAYMENT]: {
    attributes: {
      expMonth: true,
      expYear: true,
      cardNumber: true,
      cardCvc: true,
    },
    relationships: {
      items: getRelationship(MANY, types.ITEM, 'payment'),
      form: getRelationship(BELONGS, types.FORM, 'payment'),
    },
  },
  [types.ITEM]: {
    attributes: {
      price: true,
      quantity: true,
      description: true,
      label: true,
    },
    relationships: {
      payment: getRelationship(BELONGS, types.PAYMENT, 'items'),
    },
  },
};

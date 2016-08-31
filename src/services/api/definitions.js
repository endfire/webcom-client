import { Schema, arrayOf } from 'normalizr';

export const ad = new Schema('ads');
export const brand = new Schema('brands');
export const category = new Schema('categories');
export const company = new Schema('companies');
export const listing = new Schema('listing');
export const submission = new Schema('submissions');
export const field = new Schema('fields');
export const form = new Schema('forms');
export const payment = new Schema('payment');
export const item = new Schema('item');
export const person = new Schema('people');
export const user = new Schema('users');

ad.define({ company, categories: arrayOf(category) });
brand.define({ forms: arrayOf(form), categories: arrayOf(category) });
category.define({ brand, listings: arrayOf(company), ads: arrayOf(ad) });
company.define({ listings: arrayOf(category), ads: arrayOf(ad), people: arrayOf(person) });
listing.define({ categories: arrayOf(category), company });
submission.define({ form, fields: arrayOf(field) });
field.define({ form });
form.define({ brand, payment, fields: arrayOf(field), submissions: arrayOf(submission) });
payment.define({ form, items: arrayOf(item) });
item.define({ payment });
person.define({ company });
user.define({});

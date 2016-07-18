import { Schema, arrayOf } from 'normalizr';

export const ad = new Schema('ads');
export const brand = new Schema('brands');
export const category = new Schema('categories');
export const company = new Schema('companies');
export const submission = new Schema('submissions');
export const field = new Schema('fields');
export const form = new Schema('forms');
export const listing = new Schema('listings');
export const obg = new Schema('obg');
export const person = new Schema('people');
export const user = new Schema('users');

ad.define({ company, categories: arrayOf(category) });
brand.define({ obg, forms: arrayOf(form) });
category.define({ obg, listings: arrayOf(listing), ads: arrayOf(ad) });
company.define({ listings: arrayOf(listing), ads: arrayOf(ad), people: arrayOf(person) });
submission.define({ form, fields: arrayOf(field) });
form.define({ brand, fields: arrayOf(field), submissions: arrayOf(submission) });
listing.define({ company, categories: arrayOf(category) });
obg.define({ brand, categories: arrayOf(category) });
person.define({ company });
user.define({});

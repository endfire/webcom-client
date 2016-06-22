import { Schema, arrayOf } from 'normalizr';

export const ad = new Schema('ads');
export const brand = new Schema('brands');
export const category = new Schema('categories');
export const company = new Schema('companies');
export const data = new Schema('data');
export const field = new Schema('fields');
export const form = new Schema('forms');
export const heading = new Schema('headings');
export const listing = new Schema('listings');
export const obg = new Schema('obgs');
export const person = new Schema('people');
export const user = new Schema('users');

ad.define({ company, obg, categories: arrayOf(category) });
brand.define({ forms: arrayOf(form) });
category.define({ obg, heading, listings: arrayOf(listing), ads: arrayOf(ad) });
company.define({ listings: arrayOf(listing), ads: arrayOf(ad), people: arrayOf(person) });
data.define({ fields: arrayOf(field) });
form.define({ brand, fields: arrayOf(field) });
heading.define({ obg, categories: arrayOf(category) });
listing.define({ company, obg, categories: arrayOf(category) });
obg.define({ brand, headings: arrayOf(heading) });
person.define({ company });
user.define({});

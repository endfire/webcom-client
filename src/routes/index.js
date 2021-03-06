import store from 'configureStore';
import { api } from 'services/api';

import checkAuth from './checkAuth';
import requiresUserAuth from './requiresUserAuth';
import requiresCompanyAuth from './requiresCompanyAuth';
import canAccessOBG from './canAccessOBG';
import checkIfPublished from './checkIfPublished';
import fetchDynamicPathEntity from './fetchDynamicPathEntity';

import { App, Welcome } from 'components';
import { Admin, Company, Signup, OBG, Form } from 'scenes';
import { LoginAdmin, LoginCompany } from 'scenes/Login/scenes';
import { Listings, People, Settings } from 'scenes/Company/scenes';
import { SubmissionForm, NotPublished, SubmitSuccess } from 'scenes/Form/scenes';

import { Brand, BrandsAll, CompanyOne, CompaniesAll, Users } from 'scenes/Admin/scenes';
import {
  CompanyListings,
  CompanyAds,
  CompanyPeople,
  CompanyInfo,
} from 'scenes/Admin/scenes/CompanyOne/scenes';

import { BrandForms, BrandOBG, BrandSettings } from 'scenes/Admin/scenes/Brand/scenes';
import { BrandForm } from 'scenes/Admin/scenes/Brand/scenes/BrandForms/scenes';

export default {
  path: '/',
  component: App,
  indexRoute: { component: Signup },
  childRoutes: [
    {
      path: 'admin-login',
      component: LoginAdmin,
    },
    {
      path: 'company-login',
      component: LoginCompany,
    },
    {
      path: 'signup',
      component: Signup,
    },
    {
      path: 'obg/:brandID',
      component: OBG,
    },
    {
      path: 'not-published',
      component: NotPublished,
    },
    {
      path: 'submit-success',
      component: SubmitSuccess,
    },
    {
      path: 'form',
      component: Form,
      childRoutes: [
        {
          path: ':submissionFormID',
          component: SubmissionForm,
          onEnter: checkIfPublished(store, api),
        },
      ],
    },
    {
      path: 'admin',
      component: requiresUserAuth(Admin),
      onEnter: checkAuth(store, api),
      indexRoute: { component: Welcome },
      childRoutes: [
        {
          path: 'brands',
          indexRoute: { component: BrandsAll },
        },
        {
          path: 'brands/:brandID',
          component: Brand,
          onEnter: fetchDynamicPathEntity(store, api, 'brand', 'brandID', {
            without: {
              categories: {
                listings: true,
                ads: true,
              },
            },
          }),
          indexRoute: {
            onEnter: ({ params }, replace) => replace(`/admin/brands/${params.brandID}/forms`),
          },
          childRoutes: [
            {
              path: 'settings',
              component: BrandSettings,
            },
            {
              path: 'forms',
              component: BrandForms,
            },
            {
              path: 'forms/:formID',
              component: BrandForm,
            },
            {
              path: 'obg',
              component: BrandOBG,
              indexRoute: {
                onEnter: canAccessOBG(store),
              },
            },
          ],
        },
        {
          path: 'companies',
          indexRoute: { component: CompaniesAll },
        },
        {
          path: 'companies/:companyID',
          component: CompanyOne,
          onEnter: fetchDynamicPathEntity(store, api, 'company', 'companyID', {
            without: {
              listings: {
                categories: true,
              },
            },
          }),
          indexRoute: {
            onEnter: ({ params }, replace) =>
              replace(`/admin/companies/${params.companyID}/listings`),
          },
          childRoutes: [
            {
              path: 'listings',
              component: CompanyListings,
            },
            {
              path: 'obgs',
              component: CompanyAds,
            },
            {
              path: 'people',
              component: CompanyPeople,
            },
            {
              path: 'info',
              component: CompanyInfo,
            },
          ],
        },
        {
          path: 'users',
          component: Users,
        },
      ],
    },
    {
      path: 'company',
      component: requiresCompanyAuth(Company),
      onEnter: checkAuth(store, api),
      indexRoute: { component: Welcome },
      childRoutes: [
        {
          path: 'listings',
          component: Listings,
        },
        {
          path: 'people',
          component: People,
        },
        {
          path: 'settings',
          component: Settings,
          onEnter: fetchDynamicPathEntity(store, api, 'company'),
        },
      ],
    },
  ],
};

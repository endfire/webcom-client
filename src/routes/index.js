import store from '../configureStore';
import { api } from '../services/api';
import checkAuth from './checkAuth';
import requiresUserAuth from './requiresUserAuth';
import requiresCompanyAuth from './requiresCompanyAuth';

import { App, Welcome } from '../components';
import { Admin, Company } from '../scenes';
import { LoginAdmin, LoginCompany } from '../scenes/Login/scenes';
import { Listings, People, Settings } from '../scenes/Company/scenes';

import { Brand, BrandsAll, Companies, Users } from '../scenes/Admin/scenes';
import { CompaniesAds, CompaniesAll } from '../scenes/Admin/scenes/Companies/scenes';
import { BrandForms, BrandOBG, BrandSettings } from '../scenes/Admin/scenes/Brand/scenes';

export default {
  path: '/',
  component: App,
  onEnter: checkAuth(store, api),
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
      path: 'admin',
      component: requiresUserAuth(Admin),
      indexRoute: { component: Welcome },
      childRoutes: [
        {
          path: 'brands',
          indexRoute: { component: BrandsAll },
        },
        {
          path: 'brands/:id',
          component: Brand,
          indexRoute: {
            onEnter: ({ params }, replace) => replace(`/admin/brands/${params.id}/forms`),
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
              path: 'obg',
              component: BrandOBG,
            },
          ],
        },
        {
          path: 'companies',
          component: Companies,
          indexRoute: { onEnter: (nextState, replace) => replace('/admin/companies/all') },
          childRoutes: [
            {
              path: 'all',
              component: CompaniesAll,
            },
            {
              path: 'ads',
              component: CompaniesAds,
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
        },
      ],
    },
  ],
};

import store from '../configureStore';
import { api } from '../services/api';
import checkAuth from './checkAuth';
import requiresUserAuth from './requiresUserAuth';
import requiresCompanyAuth from './requiresCompanyAuth';

import { App, Welcome } from '../components';
import { Admin, Company } from '../scenes';
import { LoginAdmin, LoginCompany } from '../scenes/Login/scenes';
import { Brands, OBG, Users } from '../scenes/Admin/scenes';
import { Listings, People, Settings } from '../scenes/Company/scenes';
import { CompaniesAds, CompaniesAll } from '../scenes/Admin/scenes/Companies/scenes';

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
          component: Brands,
        },
        {
          path: 'companies',
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
          path: 'obg',
          component: OBG,
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

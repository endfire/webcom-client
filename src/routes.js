import { App, Welcome } from './components';
import { Admin, Company } from './scenes';
import { LoginAdmin, LoginCompany } from './scenes/Login/scenes';
import { Brands, OBG, Users } from './scenes/Admin/scenes';
import { Listings, People, Settings } from './scenes/Company/scenes';
import { CompaniesAds, CompaniesAll } from './scenes/Admin/scenes/Companies/scenes';

const routes = {
  path: '/',
  component: App,
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
      component: Admin,
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
      component: Company,
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

export default routes;

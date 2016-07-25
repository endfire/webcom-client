import { App, Welcome } from './components';
import { Admin, Company } from './scenes';
import { LoginAdmin, LoginCompany } from './scenes/Login/scenes';
import { Brands, OBG, Users } from './scenes/Admin/scenes';
import { Listings, People, Settings } from './scenes/Company/scenes';
import { CompaniesAds, CompaniesAll } from './scenes/Admin/scenes/Companies/scenes';
import { BrandForms, BrandObg, BrandSettings } from './scenes/Admin/scenes/Brands/scenes';

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
          childRoutes: [
            {
              path: 'brand/:id',
              indexRoute: { onEnter: (nextState, replace) => {
                const { id } = nextState.params;
                replace(`/admin/brands/brand/${id}/forms`);
              } },
              childRoutes: [
                {
                  path: 'forms',
                  component: BrandForms,
                },
                {
                  path: 'settings',
                  component: BrandSettings,
                },
                {
                  path: 'obg',
                  component: BrandObg,
                },
              ],
            },
          ],
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

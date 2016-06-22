import App from './containers/App';
import AdminDashboard from './containers/AdminDashboard';
import BrandList from './containers/AdminDashboard/containers/BrandList';
import CompanyList from './containers/AdminDashboard/containers/CompanyList';
import OBGList from './containers/AdminDashboard/containers/OBGList';
import UserList from './containers/AdminDashboard/containers/UserList';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    {
      path: 'admin',
      indexRoute: { component: BrandList },
      component: AdminDashboard,
      childRoutes: [
        {
          path: 'companies',
          component: CompanyList,
        },
        {
          path: 'obg',
          component: OBGList,
        },
        {
          path: 'users',
          component: UserList,
        },
      ],
    },
  ],
};

export default routes;

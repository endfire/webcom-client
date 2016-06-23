import App from './containers/App';
import AdminDashboard from './containers/AdminDashboard';
import BrandList from './containers/AdminDashboard/containers/BrandList';
import Brand from './containers/AdminDashboard/containers/Brand';
import FormList from './containers/AdminDashboard/containers/Brand/containers/FormList';
import FormPreview from './containers/AdminDashboard/containers/Brand/containers/FormPreview';
import BrandSettings from './containers/AdminDashboard/containers/Brand/containers/Settings';
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
          path: 'brands/:id',
          indexRoute: { component: FormList },
          component: Brand,
        },
        {
          path: 'brands/:id/:formId',
          component: FormPreview,
        },
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

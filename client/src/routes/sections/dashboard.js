import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));

// USERS
const AllUsers = lazy(() => import('src/pages/dashboard/user/list'));
const CreateUser = lazy(() => import('src/pages/dashboard/user/new'));

// PRODUCTS
const AllProducts = lazy(() => import('src/pages/dashboard/product/list'));
const AddProduct = lazy(() => import('src/pages/dashboard/product/new'));
// const PageSix = lazy(() => import('src/pages/dashboard/six'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'users',
        children: [
          { element: <AllUsers />, index: true },
          { path: 'new', element: <CreateUser /> },
          // { path: 'six', element: <PageSix /> },
        ],
      },
      {
        path: 'products',
        children: [
          { element: <AllProducts />, index: true },
          { path: 'add', element: <AddProduct /> },
          // { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];

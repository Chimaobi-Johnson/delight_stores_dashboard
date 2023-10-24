import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import AddDiscount from 'src/pages/dashboard/actions/add-discount';

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
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

// CATEGORIES
const AllCategories = lazy(() => import('src/pages/dashboard/categories/list'));
const AddCategory = lazy(() => import('src/pages/dashboard/categories/new'));
const CategoryDetailsPage = lazy(() => import('src/pages/dashboard/categories/details'));
const CategoryEditPage = lazy(() => import('src/pages/dashboard/categories/edit'));

// SITE CONTENT
const HomeContent = lazy(() => import('src/pages/dashboard/sitecontent/home'));
const AboutContent = lazy(() => import('src/pages/dashboard/sitecontent/about'));
const ProductContent = lazy(() => import('src/pages/dashboard/sitecontent/productdetails'));
const ContactDetails = lazy(() => import('src/pages/dashboard/sitecontent/contact'));


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
        ],
      },
      {
        path: 'products',
        children: [
          { element: <AllProducts />, index: true },
          { path: 'add', element: <AddProduct /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'categories',
        children: [
          { element: <AllCategories />, index: true },
          { path: 'add', element: <AddCategory /> },
          { path: ':id', element: <CategoryDetailsPage /> },
          { path: ':id/edit', element: <CategoryEditPage /> },
        ],
      },
      {
        path: 'actions',
        children: [
          { element: <AddDiscount />, index: true },
        ],
      },
      {
        path: 'site',
        children: [
          { element: <HomeContent />, index: true },
          { path: 'about', element: <AboutContent /> },
          { path: 'product-details', element: <ProductContent /> },
          { path: 'contact-details', element: <ContactDetails /> },
        ],
      },
    ],
  },
];

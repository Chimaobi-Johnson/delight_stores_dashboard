// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    users: {
      root: `${ROOTS.DASHBOARD}/users`,
      new: `${ROOTS.DASHBOARD}/users/new`,
    },
    actions: {
      root: `${ROOTS.DASHBOARD}/actions`,
    },
    products: {
      root: `${ROOTS.DASHBOARD}/products`,
      add: `${ROOTS.DASHBOARD}/products/add`,
      details: (id) => `${ROOTS.DASHBOARD}/products/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/products/${id}/edit`,
    },
    categories: {
      root: `${ROOTS.DASHBOARD}/categories`,
      add: `${ROOTS.DASHBOARD}/categories/add`,
      details: (id) => `${ROOTS.DASHBOARD}/categories/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/categories/${id}/edit`,
    },
    site: {
      root: `${ROOTS.DASHBOARD}/site`,
      about: `${ROOTS.DASHBOARD}/site/about`,
      product: `${ROOTS.DASHBOARD}/site/product-details`,
      contact: `${ROOTS.DASHBOARD}/site/contact-details`,
    },
  },
};

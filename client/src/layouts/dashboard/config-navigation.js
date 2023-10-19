import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview v5.3.0',
        items: [
          { title: 'Store', path: paths.dashboard.root, icon: ICONS.ecommerce },
          {
            title: 'Analytics',
            path: paths.dashboard.two,
            icon: ICONS.analytics,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'management',
        items: [
          {
            title: 'users',
            path: paths.dashboard.users.root,
            icon: ICONS.user,
            children: [
              { title: 'List', path: paths.dashboard.users.root },
              { title: 'New', path: paths.dashboard.users.new },
              // { title: '', path: paths.dashboard.group.six },
            ],
          },
          {
            title: 'products',
            path: paths.dashboard.products.root,
            icon: ICONS.product,
            children: [
              { title: 'List', path: paths.dashboard.products.root },
              { title: 'Add', path: paths.dashboard.products.add },
              // { title: 'Details', path: paths.dashboard.products.details },
            ],
          },
          {
            title: 'actions',
            path: paths.dashboard.actions.root,
            icon: ICONS.banking,
            children: [
              { title: 'Apply Discount', path: paths.dashboard.actions.root },
            ],
          },
        ],
      },
    ],
    []
  );

  return data;
}

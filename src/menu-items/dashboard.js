// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Home',
      type: 'item',
      url: '/solutions',
      icon: icons.IconDashboard,
      breadcrumbs: true
    }
  ]
};

export default dashboard;

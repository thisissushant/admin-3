  // assets
import {
  IconSettingsCode,
  IconUser,
  IconSettingsStar,
  IconBoxModel,
  IconBrandAsana,
  IconDatabase,
  IconBrandHipchat,
  IconArrowIteration,
  IconBrandLaravel,
  IconDevicesCog,
  IconSettingsAutomation,
  IconSettingsSearch,
  IconDatabaseShare,
  IconDetails,
  IconCategory2,
  IconFloatCenter,
  IconFileInvoice,
  IconBuildingStore,
  IconWriting,
  IconTornado,
  IconForms,
  IconCategoryMinus
} from '@tabler/icons-react';

// constant
const icons = {
  IconSettingsCode,
  IconUser,
  IconSettingsStar,
  IconBoxModel,
  IconBrandAsana,
  IconDatabase,
  IconBrandHipchat,
  IconArrowIteration,
  IconBrandLaravel,
  IconDevicesCog,
  IconSettingsAutomation,
  IconSettingsSearch,
  IconDatabaseShare,
  IconDetails,
  IconCategory2,
  IconFloatCenter,
  IconFileInvoice,
  IconBuildingStore,
  IconWriting,
  IconTornado,
  IconForms,
  IconCategoryMinus
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'C201',
      title: 'Technical Settings ',
      type: 'collapse',
      icon: icons.IconSettingsCode,
      children: [
        {
          id: 'user&role',
          title: 'User & Role Management',
          type: 'item',
          url: '/solutions/technicalSetting/user&RoleManagement',
          icon: icons.IconUser
        },
        {
          id: 'systemCoreSetting ',
          title: 'System Core Settings ',
          type: 'item',
          url: '/solutions/technicalSetting/systemCoreSettings ',
          icon: icons.IconSettingsStar,
          children: [
            {
              id: 'user&role',
              title: 'User & Role Management',
              type: 'item',
              url: '/solutions/technicalSetting/user&RoleManagement',
              icon: icons.IconUser
            }
          ]
        },
        {
          id: 'aiModelAgentTools',
          title: 'AI Models, Agents & Tools',
          type: 'item',
          url: '/solutions/technicalSetting/AI modelsAgents&Tools',
          icon: icons.IconBoxModel
        },
        {
          id: 'aiEthics&Bias',
          title: 'AI Ethics & Bias Mgmt.',
          type: 'item',
          url: '/solutions/technicalSetting/aIEthics&BiasMgmt',
          icon: icons.IconBrandAsana
        },
        {
          id: 'dataManagement',
          title: 'Data Management & Integration',
          type: 'item',
          url: '/solutions/technicalSetting/dataManagement&Integration',
          icon: icons.IconDatabase
        },
        {
          id: 'communication&Notification',
          title: 'Communication & Notification ',
          type: 'item',
          url: '/solutions/technicalSetting/communication&Notification ',
          icon: icons.IconBrandHipchat
        },
        {
          id: 'eRPIntegration&Mapping ',
          title: 'ERP Integration & Mapping ',
          type: 'item',
          url: '/solutions/technicalSetting/eRPIntegration&Mapping ',
          icon: icons.IconArrowIteration
        },
        {
          id: 'systemReliability&Maintenance',
          title: 'System Reliability & Maintenance',
          type: 'item',
          url: '/solutions/technicalSetting/systemReliability&Maintenance',
          icon: icons.IconBrandLaravel
        },
        {
          id: 'devOps/CI/CD',
          title: 'Dev Ops / CI/CD',
          type: 'item',
          url: '/solutions/technicalSetting/devOps/CI/CD',
          icon: icons.IconDevicesCog
        }
      ]
    },
    {
      id: 'C202',
      title: 'Solution Settings ',
      type: 'collapse',
      icon: icons.IconSettingsAutomation,

      children: [
        {
          id: 'activateSolution',
          title: 'Activate Solution',
          type: 'item',
          url: '/solutions/ActivateSolution',
          icon: icons.IconSettingsSearch
        },
        {
          id: 'C301',
          title: 'Master Data',
          type: 'collapse',
          icon: icons.IconDatabaseShare,
          children:[
            {
              id: 'orgDetails',
              title: 'Org Details',
              type: 'item',
              url: '',
              icon: icons.IconDetails
            },
            {
              id: 'categoryID',
              title: 'Category ID',
              type: 'item',
              url: '/solutions/masterData/categoryID',
              icon: icons.IconCategory2
            },
            {
              id: 'costCenter',
              title: 'Cost Center',
              type: 'item',
              url: '/solutions/masterData/costCenter',
              icon: icons.IconFloatCenter
            },
            {
              id: 'glAccount',
              title: 'GL Account',
              type: 'item',
              url: '/solutions/masterData/glAccount',
              icon: icons.IconFileInvoice
            },
            {
              id: 'supplierData',
              title: 'Supplier Data',
              type: 'item',
              url: '/solutions/masterData/supplierData',
              icon: icons.IconBuildingStore
            },
            {
              id: 'contract',
              title: 'Contract',
              type: 'item',
              url: '/solutions/masterData/contract',
              icon: icons.IconWriting
            },
            {
              id: 'catalog',
              title: 'Catalog',
              type: 'item',
              url: '/solutions/masterData/catalog',
              icon: icons.IconTornado
            },
            {
              id: 'forms',
              title: 'Forms',
              type: 'item',
              url: '/solutions/masterData/forms',
              icon: icons.IconForms
            },
            {
              id: 'categoryCard',
              title: 'Category Card',
              type: 'item',
              url: '/solutions/masterData/categoryCard',
              icon: icons.IconCategoryMinus
            },
          ]
        }
      ]
    }
  ]
};

export default pages;

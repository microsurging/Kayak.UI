// JavaScript source code
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/',
  name: 'iotsystem',
  component: LAYOUT,
  meta: {
    icon: 'ant-design:cloud-server-outlined',
    title: t('routes.basic.iotSystem'),
    orderNo: 1,
  },
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        orderNo: 1,
        icon: 'ant-design:dashboard-outlined',
        title: t('routes.dashboard.dashboard'),
      },
    },
    {
      path: '/servicemanage',
      name: 'ServiceManage',
      component: () => import('/@/views/servicemanage/registrycenter/index.vue'),
      redirect: '/servicemanage/registrycenter',
      meta: {
        icon: 'ant-design:cloud-server-outlined',
        title: t('routes.servicemanage.servicemanage'),
        orderNo: 9,
      },
      children: [
        {
          path: 'registrycenter',
          name: 'registryCenterPage',
          component: () => import('/@/views/servicemanage/registrycenter/index.vue'),
          meta: {
            title: t('routes.servicemanage.registrycenter'),
            icon: 'ant-design:profile-outlined',
          },
        },
        {
          path: '/servicemanage/serviceroute',
          name: 'serviceRoutePage',
          component: () => import('/@/views/servicemanage/serviceroute/index.vue'),
          meta: {
            title: t('routes.servicemanage.serviceroute'),
            icon: 'ant-design:hdd-filled',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: '/servicemanage/serviceroute/detail',
              name: 'routedetailPage',
              component: () => import('/@/views/servicemanage/serviceroute/detail/index.vue'),
              meta: {
                title: t('routes.servicemanage.serviceroutedetail'),
                hideMenu: true,
                currentActiveMenu: '/servicemanage/serviceroute',
              },
            },
          ],
        },

        {
          path: '/servicemanage/servicenode',
          name: 'servicenodePage',
          component: () => import('/@/views/servicemanage/servicenode/index.vue'),
          meta: {
            title: t('routes.servicemanage.servicenode'),
            icon: 'ant-design:reconciliation-outlined',
          },
        },
        {
          path: '/servicemanage/moduleManage',
          name: 'moduleManagePage',
          component: () => import('/@/views/servicemanage/moduleManage/index.vue'),
          meta: {
            title: t('routes.servicemanage.modulemanage'),
            icon: 'ant-design:dropbox-outlined',
          },
        },
        {
          path: '/servicemanage/intermediateService',
          name: 'intermediatePage',
          component: () => import('/@/views/servicemanage/intermediateService/index.vue'),
          meta: {
            title: t('routes.servicemanage.intermediate'),
            icon: 'ant-design:ungroup-outlined',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: '/servicemanage/intermediateService/detail',
              name: 'detailPage',
              component: () => import('/@/views/servicemanage/intermediateService/detail/index.vue'),
              meta: {
                title: t('routes.servicemanage.servicedetail'),
                hideMenu: true,
                currentActiveMenu: '/servicemanage/intermediateService',
              },
            },
          ],
        },
        {
          path: '/servicemanage/blackwhitelist',
          name: 'blackWhiteListPage',
          component: () => import('/@/views/servicemanage/blackwhitelist/index.vue'),
          meta: {
            title: t('routes.servicemanage.blackWhiteList'),
            icon: 'ant-design:file-protect-outlined',
          },
        },
      ],
    },
    {
      path: '/DeviceMange',
      name: 'DeviceMange',
      component: LAYOUT,
      redirect: '/DeviceMange/product',
      meta: {
        icon: 'ant-design:control-outlined',
        title: t('routes.devicemange.devicemange'),
        orderNo: 10,
      },
      children: [
        {
          path: '/DeviceMange/product',
          name: 'product',
          component: () => import('/@/views/devicemange/product/index.vue'),
          meta: {
            title: t('routes.devicemange.product'),
            icon: 'ant-design:laptop-outlined',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: '/DeviceMange/product/productDetail',
              name: 'productDetail',
              component: () => import('/@/views/devicemange/product/productdetail/index.vue'),
              meta: {
                title: t('routes.devicemange.seeproduct'),
                hideMenu: true,
                currentActiveMenu: '/DeviceMange/product',
              },
            },
            {
              path: '/DeviceMange/product/add',
              name: 'addPage',
              component: () => import('/@/views/devicemange/product/add/index.vue'),
              meta: {
                title: t('routes.devicemange.addproduct'),
                currentActiveMenu: '/DeviceMange/product',
                hideMenu: true,
              },
            },
          ],
        },
        {
          path: '/product-category',
          name: 'productCategoryPage',
          component: () => import('/@/views/devicemange/productcategory/index.vue'),
          meta: {
            title: t('routes.devicemange.productclassification'),
            icon: 'ion:grid-outline',
          },
        },
        {
          path: '/deviceType',
          name: 'deviceTypePage',
          component: () => import('/@/views/devicemange/devicetype/index.vue'),
          meta: {
            title: t('routes.devicemange.deviceType'),
            icon: 'ant-design:codepen-square-filled',
          },
        },
        {
          path: '/device',
          name: 'devicePage',
          component: () => import('/@/views/devicemange/device/index.vue'),
          meta: {
            title: t('routes.devicemange.device'),
            icon: 'ant-design:codepen-outlined',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: '/device/deviceDetai',
              name: 'deviceDetailPage',
              component: () => import('/@/views/devicemange/device/devicedetail/index.vue'),
              meta: {
                title: t('routes.devicemange.seeDevice'),
                currentActiveMenu: '/device',
                hideMenu: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/deviceconnect',
      name: 'Deviceconnect',
      component: LAYOUT,
      redirect: '/deviceconnect/index',
      meta: {
        icon: 'ant-design:apartment-outlined',
        title: t('routes.deviceconnect.deviceconnect'),
        orderNo: 11,
      },
      children: [
        {
          path: 'protocolmanage',
          name: 'protocolmanagePage',
          component: () => import('/@/views/deviceconnect/protocolmanage/index.vue'),
          meta: {
            title: t('routes.deviceconnect.protocolmanage'),
            icon: 'ant-design:deployment-unit-outlined',
          },
        },
        {
          path: 'networkcomponent',
          name: 'NetworkcomponentPage',
          component: () => import('/@/views/deviceconnect/networkcomponent/index.vue'),
          meta: {
            title: t('routes.deviceconnect.networkcomponent'),
            icon: 'ion:layers-outline',
          },
        },
        {
          path: 'devicegateway',
          name: 'devicegatewayPage',
          component: () => import('/@/views/deviceconnect/devicegateway/index.vue'),
          meta: {
            title: t('routes.deviceconnect.devicegateway'),
            icon: 'ant-design:gateway-outlined',
          },
        },
      ],
    },
    {
      path: '/ruleengine',
      name: 'RuleEngine',
      component: LAYOUT,
      redirect: '/ruleengine/index',
      meta: {
        icon: 'ant-design:partition-outlined',
        title: t('routes.ruleengine.ruleengine'),
        orderNo: 11,
      },
      children: [
        {
          path: 'rulesetting',
          name: 'rulesettingPage',
          component: () => import('/@/views/ruleengine/rulesetting/index.vue'),
          meta: {
            title: t('routes.ruleengine.rulesetting'),
            icon: 'ant-design:node-index-outlined',
          },
        },
      ],
    },
    {
      path: '/systemmanage',
      name: 'SystemManage',
      component: LAYOUT,
      redirect: '/systemmanage/index',
      meta: {
        icon: 'ant-design:setting',
        title: t('routes.systemmanage.systemmanage'),
        orderNo: 11,
      },
      children: [
        {
          path: 'dictionarymanage',
          name: 'dictionarymanagePage',
          component: () => import('/@/views/systemmanage/dictionarymanage/index.vue'),
          meta: {
            title: t('routes.systemmanage.dictionarymanage'),
            icon: 'ant-design:snippets',
          },
        },
        {
          path: 'usermanage',
          name: 'usermanagePage',
          component: () => import('/@/views/systemmanage/usermanagePage/index.vue'),
          meta: {
            title: t('routes.systemmanage.usermanage'),
            icon: 'ant-design:usergroup-add-outlined',
          },
        },
        {
          path: 'sysorgmanage',
          name: 'sysorgmanagePage',
          component: () => import('/@/views/systemmanage/sysorgmanagePage/index.vue'),
          meta: {
            title: t('routes.systemmanage.sysorgmanage'),
            icon: 'ant-design:apartment-outlined',
          },
        },
        {
          path: 'sysunitmanage',
          name: 'sysunitmanagePage',
          component: () => import('/@/views/systemmanage/sysunitmanagePage/index.vue'),
          meta: {
            title: t('routes.systemmanage.unitmanage'),
            icon: 'ant-design:container-outlined',
          },
        },
        {
          path: 'sysdatatypemanage',
          name: 'sysdatatypemanagePage',
          component: () => import('/@/views/systemmanage/sysdatatypemanagePage/index.vue'),
          meta: {
            title: t('routes.systemmanage.datatypemanage'),
            icon: 'ant-design:diff-outlined',
          },
        },
      ],
    },
    {
      path: '/servicelog',
      name: 'ServiceLog',
      component: LAYOUT,
      redirect: '/operatelogPage/index',
      meta: {
        icon: 'ant-design:file-done-outlined',
        title: t('routes.systemmanage.servicelog'),
        orderNo: 12,
      },
      children: [
        {
          path: 'operatelog',
          name: 'operatelogPage',
          component: () => import('/@/views/systemmanage/operatelogPage/index.vue'),
          meta: {
            title: t('routes.systemmanage.operatelog'),
            icon: 'ant-design:snippets',
          },
        },
      ],
    },
    {
      path: '/bugtest',
      name: 'Bugtest',
      component: LAYOUT,
      redirect: '/Bugtest/index',
      meta: {
        icon: 'ant-design:bug-filled',
        title: t('routes.bugtest.bugtest'),
        orderNo: 13,
      },
      children: [
        {
          path: 'wstest',
          name: 'WstestPage',
          component: () => import('/@/views/deviceconnect/networkcomponent/index.vue'),
          meta: {
            title: t('routes.bugtest.websocketest'),
            icon: 'ant-design:bug-outlined',
          },
        },
      ],
    },
  ],
};

export default dashboard;

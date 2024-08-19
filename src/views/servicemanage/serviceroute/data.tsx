import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Table';
import { Tag } from 'ant-design-vue';
import { useRegistryCenterStore } from '/@/store/modules/registrycenter';
import { h } from 'vue';
const registryCenterStore = useRegistryCenterStore();
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '服务Id',
      dataIndex: 'id',
      sorter: true,
      width: 150,
    },
    {
      title: '注册中心',
      dataIndex: 'regCenterName',
      width: 200,
    },
    {
      title: 'Token',
      dataIndex: 'token',
      width: 200,
    },
    {
      title: 'RoutePath',
      dataIndex: 'routePath',
      width: 200,
    },
  ];
}

export function getServiceNodeColumns(): BasicColumn[] {
  return [
    {
      title: 'IP',
      dataIndex: 'ip',
      sorter: true,
      width: 150,
    },
    {
      title: 'Port',
      dataIndex: 'port',
      width: 200,
    },
    {
      title: '权重',
      dataIndex: 'wt',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'State',
      width: 150,

      customRender: ({ record }) => {
        const color = record.isHealth ? '#87d068' : '#f39c9c';
        const text = record.isHealth ? '健康' : '异常';
        return h(Tag, { color: color }, () => text);
      },
    },
  ];
}

export function getBasicData() {
  const data: any = (() => {
    const arr: any = [];
    arr.push({
      Id: `Surging.IModuleServices.Common.IUserService.GetUser_user`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/user/getuser`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    arr.push({
      Id: `Surging.IModuleServices.Common.IAsyncService.SayHelloAsync_cancellationToken`,
      RegistryCenter: 'consul 注册中心',
      Token: `77f1e0e08f434d2a89e1c14b19d67893`,
      RoutePath: `api/async/sayhelloasync`,
    });
    return arr;
  })();
  return data;
}
export const getAdvanceSchema = (): FormSchema[] => {
  const arr: any = [];
  arr.push({
    field: `Id`,
    label: `服务Id:`,
    component: 'Input',
    colProps: {
      xl: 6,
      xxl: 2,
    },
  });

  arr.push({
    field: `RegistryCenter`,
    label: `注册中心:`,
    component: 'Select',
    colProps: {
      xl: 6,
      xxl: 2,
    },
    componentProps: {
      options: [
        { label: 'Consul注册中心', value: '0' },
        { label: 'Zookeeper注册中心', value: '1' },
      ],
    },
  });

  return arr;
};

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema()],
  };
}

export function getServiceNodeData() {
  const data: any = (() => {
    const arr: any = [];
    arr.push({
      IP: `127.0.0.1`,
      Port: 82,
      Wt: 20,
      State: 1,
    });
    arr.push({
      IP: `127.0.0.1`,
      Port: 83,
      Wt: 20,
      State: 0,
    });

    return arr;
  })();
  return data;
}

export const serviceNodeFormSchema: FormSchema[] = [
  {
    field: 'ip',
    label: 'IP',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'port',
    label: 'Port',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'wt',
    label: '权重',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入权重',
      },
    ],
  },
];

export const serviceRouteFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '服务Id',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入服务Id',
      },
    ],
  },
  {
    field: 'regCenterName',
    label: '注册中心',
    component: 'ApiSelect',
    componentProps: {
      api: registryCenterStore.getlistApi,
      params: null,
      fieldNames: {
        label: 'Name',
        value: 'Id',
      },
    },
  },
  {
    field: 'token',
    label: 'Token',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入Token',
      },
    ],
  },
  {
    field: 'routePath',
    label: 'RoutePath',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入RoutePath',
      },
    ],
  },
];

import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Table';
import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';

const sysDicManageStore = useSysDicManageStore();
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '注册中心名称',
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'regCenterTypeName',
      width: 200,
    },
    {
      title: 'Path',
      dataIndex: 'path',
      width: 200,
    },
    {
      title: 'HOST',
      width: 150,
      dataIndex: 'host',
    },
    {
      title: 'PORT',
      dataIndex: 'port',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'remark',
      width: 150,
    },
  ];
}

export function getBasicData() {
  const data: any = (() => {
    const arr: any = [];
    arr.push({
      RegistryCenterName: `Consul注册中心`,
      RegistryCenterType: `Consul`,
      Path: `\\`,
      Host: `127.0.0.1`,
      Port: '8500',
      describe: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
    });
    arr.push({
      RegistryCenterName: `Zookeeper注册中心`,
      RegistryCenterType: `Zookeeper`,
      Path: `\\`,
      Host: `127.0.0.1`,
      Port: '2181',
      describe: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
    });
    return arr;
  })();
  return data;
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [],
  };
}

export const registrycenterFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入注册中心名称',
      },
    ],
  },
  {
    field: 'registryCenterType',
    label: '类型',
    defaultValue: 1,
    component: 'ApiSelect',
    rules: [
      {
        required: true,
        type: 'number',
        message: '请输入注册中心类型',
      },
    ],
    componentProps: {
      api: sysDicManageStore.getsysdicbyparentcodeApi,
      params: {
        parentCode: 'RegistryCenterType',
      },
      fieldNames: {
        label: 'name',
        value: 'value',
      },
    },
  },
  {
    field: 'path',
    label: 'Path',
    defaultValue: '\\',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入Path',
      },
    ],
  },
  {
    field: 'host',
    label: 'Host',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入Host',
      },
    ],
  },
  {
    field: 'port',
    label: 'Port',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入Port',
      },
    ],
  },
  {
    field: 'remark',
    label: '描述:',
    component: 'InputTextArea',
    colProps: {
      span: 24,
    },
    componentProps: {
      rows: 6,
    },
  },
];

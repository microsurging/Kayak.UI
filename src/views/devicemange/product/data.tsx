import { FormSchema } from '/@/components/Form/index';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
export const cardList = (() => {
  const result: any[] = [];
  const titles = [
    'surging测试',
    'Tcp测试',
    'UDP测试',
    'RTMP测试',
    'HTTP测试',
    'DNS测试',
    'UDP测试1',
    'Tcp测试1',
    'UDP测试2',
    'Tcp测试2',
    'UDP测试3',
  ];
  const componentTypes = [
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
    '直连设备',
  ];
  result.push({});
  for (let i = 0; i < 12; i++) {
    result.push({
      id: i,
      title: titles[i],
      componenttype: componentTypes[i],
      icon: 'logos:vue',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'ProductID',
    component: 'Input',
    label: '产品ID：',
    colProps: { span: 18 },
  },
  {
    field: 'ProductName',
    component: 'Input',
    label: '产品名称：',
    colProps: { span: 18 },
  },
  {
    field: 'ProductCategory',
    component: 'Input',
    label: '产品品类：',
    colProps: { span: 18 },
  },
  {
    field: 'Organization',
    component: 'Input',
    label: '所属机构：',
    colProps: { span: 18 },
  },
  {
    field: 'MessageProtocol',
    component: 'Input',
    label: '消息协议：',
    colProps: { span: 18 },
  },
  {
    field: 'TransportProtocol',
    component: 'Input',
    label: '传输协议：',
    colProps: { span: 18 },
  },

  {
    field: 'DeviceType',
    component: 'RadioGroup',
    label: '设备类型：',
    colProps: {
      span: 24,
    },
    componentProps: {
      options: [
        {
          label: '直连设备',
          value: '0',
        },
        {
          label: '网关子设备',
          value: '1',
        },
        {
          label: '网关设备',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'Describe',
    component: 'InputTextArea',
    label: '描述：',
    colProps: { span: 18 },
  },
];

export function getAttributeData() {
  const data: any = (() => {
    const arr: any = [];
    arr.push({
      AttributeId: `file_id`,
      AttributeName: `file类型属性示例`,
      DataType: `file`,
      AttributeDataSource: 1,
      IsRead: true,
      Desc: 'file类型属性示例',
    });
    arr.push({
      AttributeId: `password_id`,
      AttributeName: `password类型属性示例`,
      DataType: `password`,
      AttributeDataSource: 2,
      IsRead: true,
      Desc: 'file类型属性示例file类型属性示例',
    });

    return arr;
  })();
  return data;
}

export function getServiceData() {
  const data: any = (() => {
    const arr: any = [];
    arr.push({
      ServiceId: `restart`,
      ServiceName: `重启`,
      IsAsync: 1,
      Desc: '',
    });

    return arr;
  })();
  return data;
}

export function getServiceColumns(): BasicColumn[] {
  return [
    {
      title: '服务标识',
      dataIndex: 'ServiceId',
      sorter: true,
      width: 150,
    },
    {
      title: '服务名称',
      dataIndex: 'ServiceName',
      width: 180,
    },
    {
      title: '是否异步',
      dataIndex: 'IsAsync',
      width: 180,
    },
    {
      title: '说明',
      dataIndex: 'Desc',
      width: 200,
    },
  ];
}

export function getServiceNodeColumns(): BasicColumn[] {
  return [
    {
      title: '属性标识',
      dataIndex: 'AttributeId',
      sorter: true,
      width: 150,
    },
    {
      title: '属性名称',
      dataIndex: 'AttributeName',
      width: 180,
    },
    {
      title: '数据类型',
      dataIndex: 'DataType',
      width: 180,
    },
    {
      title: '属性值来源',
      dataIndex: 'AttributeDataSource',
      width: 150,
    },
    {
      title: '是否只读',
      dataIndex: 'IsRead',
      width: 150,
    },
    {
      title: '说明',
      dataIndex: 'Desc',
      width: 150,
    },
  ];
}

export function getEventData() {
  const data: any = (() => {
    const arr: any = [];
    return arr;
  })();
  return data;
}

export function getEventColumns(): BasicColumn[] {
  return [
    {
      title: '服务标识',
      dataIndex: 'EventId',
      sorter: true,
      width: 150,
    },
    {
      title: '服务名称',
      dataIndex: 'EventName',
      width: 180,
    },
    {
      title: '服务级别',
      dataIndex: 'Eventlevel',
      width: 180,
    },
    {
      title: '说明',
      dataIndex: 'Desc',
      width: 200,
    },
  ];
}

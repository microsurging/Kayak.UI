import { h } from 'vue';
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { Tag } from 'ant-design-vue';
import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
import { useProtocolManageStore } from '/@/store/modules/protocolmanage';
import { useNetworkPartStore } from '/@/store/modules/networkPart';
const sysDicManageStore = useSysDicManageStore();
const protocolManageStore = useProtocolManageStore();
const networkPartStore = useNetworkPartStore();
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'gatewayTypeValue',
      width: 200,
      customRender: ({ record }) => {
        return h('div', record.gatewayType.name);;
      },
    },
    {
      title: '网络组件',
      width: 150,
      dataIndex: 'netWorkId',
      customRender: ({ record }) => {
        return h('div', record.networkPart.name);;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 150,

      customRender: ({ record }) => {
        const status = record.status;
        const enable = ~~status == 1;
        const color = enable ? '#87d068' : '#f39c9c';
        const text = enable ? '运行中' : '已停止';
        return h(Tag, { color: color }, () => text);
      },
    },
  ];
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      // title: '姓名',
      dataIndex: 'name',
      width: 120,
      // slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      dataIndex: 'address',
      width: 120,
      // slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      dataIndex: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
    },
  ];
}
const renderContent = ({ text, index }: { text: any; index: number }) => {
  const obj: any = {
    children: text,
    attrs: {},
  };
  if (index === 9) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customRender: ({ text, index }: { text: any; index: number }) => {
        const obj: any = {
          children: text,
          attrs: {},
        };
        if (index === 2) {
          obj.attrs.rowSpan = 2;
        }
        if (index === 3) {
          obj.attrs.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customRender: renderContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customRender: renderContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customRender: renderContent,
    },
  ];
}
export const getAdvanceSchema = (): FormSchema[] => {
  const arr: any = [];
  arr.push({
    field: `field${0}`,
    label: `协议名称:`,
    component: 'Input',
    colProps: {
      xl: 6,
      xxl: 6,
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
export function getBasicData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        DeviceGatewayName: `消防设备接入网关`,
        DeviceGatewayType: `TCP 透传接入`,
        NetworkComponent: `模具状态监控接入-TCP-9115`,
        MessageProtocol: `HTTP协议`,
        Status: '已启动',
        describe: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      });
    }
    return arr;
  })();
  return data;
}

export function getTreeTableData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();

  return data;
}

export const deviceGatewayFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入设备网关名称',
      },
    ],
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
  },
  {
    field: 'gatewayTypeValue',
    label: '类型',
    component: 'ApiSelect',  
    componentProps: {
      api: sysDicManageStore.getsysdictionarybyconditionApi,
      params: {
        query: {
          parentCode: 'devicegatewaytype',
        },
      },
      fieldNames: {
        label: 'Name',
        value: 'Code',
      },
    }, 
    rules: [
      {
        required: true,
        message: '请输入设备类型',
      },
    ],
  },
  {
    label: '网络组件',
    field: 'netWorkId', 
    component: 'ApiSelect', 
    componentProps: {
      api: networkPartStore.getnetworkpartbyconditionApi,
  
      params: {
        query: {
          status: 1,
        },
      },
      fieldNames: {
        label: 'Name',
        value: 'Id',
      },
    },
  },
  {
    label: '消息协议',
    field: 'protocolCode',
    component: 'ApiSelect',
    componentProps: {
      api: protocolManageStore.getprotocolsApi, 
      fieldNames: {
        label: 'protocolName',
        value: 'protocolCode',
      },
    }, 

    rules: [
      {
        required: true,

        message: '请选择消息协议',
      },
    ],
  },

  {
    label: '描述',
    field: 'remark',
    component: 'InputTextArea',
    componentProps: {
      rows: 6,
    },
  },
];

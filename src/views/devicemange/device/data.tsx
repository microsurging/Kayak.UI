import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Table';
import { useProductStore } from '/@/store/modules/product';
const productStore = useProductStore();
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '设备编码',
      dataIndex: 'Code',
      fixed: 'left',
      align: 'center',
      width: 150,
    },
    {
      title: '设备名称',
      dataIndex: 'Name',
      align: 'center',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '产品编码',
      align: 'center',
      dataIndex: 'ProductCode',
    },
    {
      title: '是否启用',
      width: 150,
      dataIndex: 'state',
      customRender: ({ record }) => {
        const status = record.Status;
        const enable = ~~status == 1;
        const color = enable ? '#87d068' : '#f39c9c';
        const text = enable ? '启用' : '停用';
        return h(Tag, { color: color }, () => text);
      },
    },
    {
      title: '描述',
      align: 'left',
      dataIndex: 'Remark',
      width: 150,
      sorter: true,
    },
  ];
}

export function getTreeTableData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        CategoryId: `${index}`,
        CategoryCode: 'John Brown',
        CategoryName: `1${index}`,
        Describe: `${index + 10}`,
      });
    }
    return arr;
  })();

  return data;
}

export const deviceFormSchema: FormSchema[] = [
  {
    field: 'Code',
    label: '设备编码',
    component: 'Input', 
  },
  {
    field: 'Name',
    label: '设备名称',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入设备名称',
      },
    ],
  },
  {
    label: '产品',
    field: 'ProductCode',
    component: 'ApiSelect',
    rules: [
      {
        required: true,
        message: '请输入产品',
      },
    ],
    componentProps: {
      api: productStore.getproductsApi,
      params: {},
      fieldNames: {
        label: 'productName',
        value: 'productCode',
      },
    },
  },

  {
    label: '备注',
    field: 'Remark',
    component: 'InputTextArea',
    componentProps: {
      rows: 6,
    },
  },
];

export function getAttributeColumns(): BasicColumn[] {
  return [
    {
      title: '属性标识',
      dataIndex: 'propertyId',
      sorter: true,
      width: 150,
    },
    {
      title: '属性名称',
      dataIndex: 'propertyName',
      width: 180,
    },
    {
      title: '数据类型',
      dataIndex: 'dataTypeName',
      width: 180,
      customRender: ({ record }) => {
        return h('div', record.propDataType.name);;
      },
    },
    {
      title: '读写类型',
      dataIndex: 'readWriteType',
      width: 150,
      customRender: ({ record }) => {
        const readWriteType = record.readWriteType;
        var array: any = [];
        readWriteType.forEach((item: string) => {

          switch (item) {
            case "read":
              {
                var color = '#87d068';
                array.push(h(Tag, { color: color }, () => "读"));
                break;
              }
            case "write":
              {
                var color = '#f39c9c';
                array.push(h(Tag, { color: color }, () => "写"));
                break;
              }
            case "report":
              {
                var color = '#1677ffbf';
                array.push(h(Tag, { color: color }, () => "上报"));
                break;
              }
          }
        });
        return h('div', array);
      },
    },
    {
      title: '说明',
      dataIndex: 'remark',
      width: 150,
    },
  ];
}

export function getEventColumns(): BasicColumn[] {
  return [
    {
      title: '事件标识',
      dataIndex: 'EventId',
      sorter: true,
      width: 150,
    },
    {
      title: '事件名称',
      dataIndex: 'EventName',
      width: 180,
    },
    {
      title: '事件级别',
      dataIndex: 'Eventlevel',
      width: 180,
      customRender: ({ record }) => {
        const eventlevel = record.Eventlevel;
        var array: any = [];

        switch (eventlevel) {
          case "ordinary":
            {
              var color = '#87d068';
              array.push(h(Tag, { color: color }, () => "普通"));
              break;
            }
          case "alarm":
            {
              var color = '#1677ffbf';
              array.push(h(Tag, { color: color }, () => "告警"));
              break;
            }
          case "emergency":
            {
              var color = '#f39c9c';
              array.push(h(Tag, { color: color }, () => "紧急"));
              break;
            }
        }
        return h('div', array);
      },
    },
    {
      title: '说明',
      dataIndex: 'Remark',
      width: 200,
    },
  ];
}

export function getFunctionColumns(): BasicColumn[] {
  return [
    {
      title: '功能标识',
      dataIndex: 'FunctionId',
      sorter: true,
      width: 150,
    },
    {
      title: '功能名称',
      dataIndex: 'FunctionName',
      width: 180,
    },
    {
      title: '是否异步',
      dataIndex: 'IsAsync',
      width: 180,
      customRender: ({ record }) => {
        let isAsync = record.IsAsync;
        var text = "异步"
        var color = '#f39c9c';
        if (isAsync === false) {
          text = "不异步"

        }
        else {
          var color = '#87d068';
        }

        return h(Tag, { color: color }, () => text)
      },
    },
    {
      title: '说明',
      dataIndex: 'Remark',
      width: 200,
    },
  ];
}

import { FormSchema } from '/@/components/Form/index';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
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

export function httpRouteColumns(): BasicColumn[] {
  return [{
    title: '分组',
    dataIndex: 'groupName',
    width: 80,
    customRender: ({ record }) => record.metadatas.groupName,
  },
  {
    title: '路径',
    dataIndex: 'path',
    width: 150,
    customRender: ({ record }) => record.metadatas.path,
  },
  {
    title: '示例',
    dataIndex: 'example',
    width: 190,
    customRender: ({ record }) => record.metadatas.example,
  },
  {
    title: '说明',
    dataIndex: 'description',
    width: 150,
    customRender: ({ record }) => record.metadatas.description,
  }
  ];
}
 
export function getThresholdColumns(): BasicColumn[] {
  return [
    {
      title: '指标阈值',
      dataIndex: 'ThresholdValue',
      editable:true,
      sorter: true,
      width: 120,
      customRender: ({ text }) => { 
          return <a-input  value={text}></a-input>;
         
      },
       
    },
    {
      title: '阈值类型',
      dataIndex: 'ThresholdType',
      width: 150,
      customRender: ({ text }) => {
        return <a-select style="width:120px" value={text}>
          <a-select-option value=">">&gt;</a-select-option>
          <a-select-option value="<">&lt;</a-select-option>
          <a-select-option value="=">=</a-select-option>
        </a-select>;

      },
    },
    {
      title: '级别',
      dataIndex: 'ThresholdLevel',
      width: 150,
         customRender: ({ text }) => {
        return <a-select style="width:120px" value={text}>
          <a-select-option value="忽略">忽略</a-select-option>
          <a-select-option value="重要">重要</a-select-option>
          <a-select-option value="告警">告警</a-select-option>
        </a-select>;

      },
    }
  ]
}


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
        return  h('div', array);
      },
    },
    {
      title: '说明',
      dataIndex: 'remark',
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

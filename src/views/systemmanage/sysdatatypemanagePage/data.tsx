import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Table';
import { useDataTypeStore } from '/@/store/modules/datatype';
const dataTypeStore = useDataTypeStore();
let Id = 0;
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '单位名称',
      dataIndex: 'Name',
      sorter: true,
      width: 150,
    },
    {
      title: '数值',
      dataIndex: 'Value',
      width: 200,
    },
    {
      title: '默认值',
      dataIndex: 'DefaultValue',
      width: 200,
    },
    {
      title: '创建日期',
      dataIndex: 'CreateDate',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'Remark',
      width: 150,
    },
  ];
}
export function setId(id: number) {
  Id = id;
}
async function validateName(name: string) {
  const data = await dataTypeStore.validateApi({
    model: {
      name: name,
      id:Id
    },
  });
  return data;
}

async function validateValue(value: number) {
  const data = await dataTypeStore.validateApi({
    model: {
      value: value,
      id: Id
    },
  });
  return data;
}

export const sysDataTypeFormSchema: FormSchema[] = [
  {
    field: 'Name',
    label: '类型名称:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入类型名称',
      }, 
      {
        validator: async (rule: RuleObject, value: string) => {
          const data = await validateName(value);
          if (data?.Result == false) {
            return Promise.reject(data?.Msg);
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      }
    ],
  },
  {
    field: 'Value',
    label: '数值:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入类型数值',
      },
      {
        validator: async (rule: RuleObject, value: number) => {
          const data = await validateValue(value);
          if (data?.Result == false) {
            return Promise.reject(data?.Msg);
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      }
    ],
  },
  {
    field: 'DefaultValue',
    label: '默认值:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入类型默认值',
      },
    ],
  },
  {
    field: 'Remark',
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

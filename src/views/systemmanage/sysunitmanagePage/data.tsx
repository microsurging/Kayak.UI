 
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormSchema } from '/@/components/Table';
import { useUnitStore } from '/@/store/modules/unit';
const unitStore = useUnitStore();
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

async function validateName(name: string) {
  const data = await unitStore.validateApi({
    model: {
      name: name,
      id: Id
    },
  });
  return data;
}
export function setId(id: number) {
  Id = id;
}
async function validateValue(value: number) {
  const data = await unitStore.validateApi({
    model: {
      value: value,
      id: Id
    },
  });
  return data;
}

export const sysUnitFormSchema: FormSchema[] = [
  {
    field: 'Name',
    label: '单位名称:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入单位名称',
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
        message: '请输入单位数值',
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

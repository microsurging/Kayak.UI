import { h, ref, unref } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
import { FormProps, FormSchema } from '/@/components/Table';
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
const sysDicManageStore = useSysDicManageStore();
let Id = ref(0);
let parentCode = ref('');
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '字典名称',
      dataIndex: 'Name',
      sorter: true,
      width: 150,
    },
    {
      title: '字典编码',
      dataIndex: 'Code',
      width: 200,
    },
    {
      title: '字典数值',
      dataIndex: 'Value',
      width: 200,
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

export function setId(id: number, code: string) {
  Id = id;
  parentCode = code == 'none' ? '' : parentCode;
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

async function validateCode(code: string) {
  const data = await sysDicManageStore.validateApi({
    model: {
      id: unref(Id),
      code: code,
      parentCode: unref(parentCode),
    },
  });
  return data;
}

async function validateName(name: string) {
  const data = await sysDicManageStore.validateApi({
    model: {
      id: unref(Id),
      name: name,
      parentCode: unref(parentCode),
    },
  });
  return data;
}

async function validateValue(value: number | null) {
  const data = await sysDicManageStore.validateApi({
    model: {
      id: unref(Id),
      value: value,
      parentCode: unref(parentCode),
    },
  });
  return data;
}

export const registrycenterFormSchema: FormSchema[] = [
  {
    field: 'Name',
    label: '名称:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入名称',
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
      },
    ],
  },
  {
    field: 'Code',
    label: '编码:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入编码',
      },
      {
        validator: async (rule: RuleObject, value: string) => {
          const data = await validateCode(value);
          if (data?.Result == false) {
            return Promise.reject(data?.Msg);
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'Value',
    label: '字典数值:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入字典数值',
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
      },
    ],
  },
  {
    field: 'IsShow',
    label: '是否显示:',
    component: 'ApiSelect',
    componentProps: {
      api: sysDicManageStore.getsysdictionarybyconditionApi,
      params: {
        query: {
          parentCode: 'isshow',
        },
      },
      fieldNames: {
        label: 'Name',
        value: 'Value',
      },
    },
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

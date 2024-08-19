import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
import { FormProps, FormSchema } from '/@/components/Table';
import { RuleObject } from 'ant-design-vue/es/form/interface';
const sysDicManageStore = useSysDicManageStore();

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '层级编码',
      dataIndex: 'LevelCode',
      width: 200,
    },
    {
      title: '机构名称',
      dataIndex: 'Name',
      sorter: true,
      width: 150,
    },

    {
      title: '从属关系',
      width: 150,
      dataIndex: 'SysOrgType',
      customRender: ({ record }) => {
        const sysorgtype = record.SysOrgType;
        let color = '';
        let text = '';
        if (sysorgtype == 1) {
          color = '#87d068';
          text = '总公司';
        } else if (sysorgtype == 2) {
          color = '#f39c9c';
          text = '子公司';
        } else if (sysorgtype == 3) {
          color = '#1677ffbf';
          text = '部门';
        }
        return h(Tag, { color: color }, () => text);
      },
    },
    {
      title: '城市',
      dataIndex: 'City',
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

async function validateName(name: string) {
  const data = await sysDicManageStore.validateApi({
    model: {
      name: name,
    },
  });
  return data;
}

export const registrycenterFormSchema: FormSchema[] = [
  {
    field: 'Name',
    label: '机构名称:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入机构名称',
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
    field: 'City',
    label: '城市:',
    component: 'Input',
  },
  {
    field: 'Address',
    label: '地址:',
    component: 'Input',
  },
  {
    field: 'Phone',
    label: '手机:',
    component: 'Input',
  },
  {
    field: 'Email',
    label: '邮箱:',
    component: 'Input',
  },
  {
    field: 'Contacter',
    label: '联系人:',
    component: 'Input',
  },
  {
    field: 'SysOrgType',
    label: '从属关系:',
    component: 'ApiSelect',
    componentProps: {
      api: sysDicManageStore.getsysdictionarybyconditionApi,
      params: {
        query: {
          parentCode: 'affiliation',
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

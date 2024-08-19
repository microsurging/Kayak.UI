import { h, ref, unref } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Table';
import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
import { useUserStore } from '/@/store/modules/user';
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
const sysDicManageStore = useSysDicManageStore();
const sysUserManageStore = useUserStore();
let userId: number = ref(0);
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '用户名',
      dataIndex: 'UserName',
      sorter: true,
      width: 150,
    },
    {
      title: '性别',
      dataIndex: 'Sex',
      customRender: ({ record }) => {
        const sex = record.Sex;
        const text = sex == 1 ? '男' : '女';
        return text;
      },
      width: 200,
    },
    {
      title: '真实姓名',
      dataIndex: 'RealName',
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
      dataIndex: 'CreateTime',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'Remark',
      width: 150,
    },
  ];
}

export function setUserId(id: number) {
  userId = id;
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

async function validateEmail(email: string) {
  const data = await sysUserManageStore.validateApi({
    model: {
      Email: email,
      UserId: unref(userId),
    },
  });
  return data;
}

async function validatePhone(phone: string) {
  const data = await sysUserManageStore.validateApi({
    model: {
      Phone: phone,
      UserId: unref(userId),
    },
  });
  return data;
}

async function validateUserName(username: string) {
  const data = await sysUserManageStore.validateApi({
    model: {
      UserName: username,
      UserId: unref(userId),
    },
  });
  return data;
}

export const registrycenterFormSchema: FormSchema[] = [
  {
    field: 'UserName',
    label: '用户名:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator: async (rule: RuleObject, value: string) => {
          const data = await validateUserName(value);
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
    field: 'Password',
    label: '密码:',
    component: 'InputPassword',
    rules: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
  },
  {
    field: 'PhoneNumber',
    label: '固定电话:',
    component: 'Input',
  },
  {
    field: 'Phone',
    label: '手机:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入手机',
      },
      {
        validator: async (rule: RuleObject, value: string) => {
          const data = await validatePhone(value);
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
    field: 'Email',
    label: '邮箱:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
      },
      {
        validator: async (rule: RuleObject, value: string) => {
          const data = await validateEmail(value);
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
    field: 'Sex',
    label: '性别:',
    component: 'ApiSelect',
    componentProps: {
      api: sysDicManageStore.getsysdictionarybyconditionApi,
      params: {
        query: {
          parentCode: 'sex',
        },
      },
      fieldNames: {
        label: 'Name',
        value: 'Value',
      },
    },
  },
  {
    field: 'RealName',
    label: '真实姓名:',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入真实姓名',
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

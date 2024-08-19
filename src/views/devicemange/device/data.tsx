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
    label: '设备编码1',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
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
  },
];

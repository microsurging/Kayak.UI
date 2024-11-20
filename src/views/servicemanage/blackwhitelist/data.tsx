import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table/src/types/table';
import {  FormSchema } from '/@/components/Table';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '路由规则',
      dataIndex: 'RoutePathPattern',
      fixed: 'left',
      width: 200,
    },
    {
      title: '黑名单',
      dataIndex: 'BlackList',
      sorter: true,
      width: 150,
    }, 
    {
      title: '白名单',
      dataIndex: 'WhiteList',
      sorter: true,
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'Status',
      width: 150,

      customRender: ({ record }) => {
        const status = record.Status;
        const enable = ~~status == 1;
        const color = enable ? '#87d068' : '#f39c9c';
        const text = enable ? '启用' : '禁用';
        return h(Tag, { color: color }, () => text);
      },
    },
    {
      title: '描述',
      width: 150,
      dataIndex: 'Remark',
    },
  ];
}


export const blackwhitelistFormSchema: FormSchema[] = [
  {
    field: 'RoutePathPattern',
    label: '路由规则',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入路由规则名称',
      },
    ],
  }, 
  {
    field: 'BlackList',
    label: '黑名单',
    component: 'Input',
  },
  {
    field: 'WhiteList',
    label: '白名单',
    component: 'Input',
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

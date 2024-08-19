import { h, ref, unref } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '服务标识',
      dataIndex: 'ServiceId',
      sorter: true,
      width: 150,
    },
    {
      title: '路由路径',
      dataIndex: 'RoutePath',
      width: 200,
    },
    {
      title: '调用参数',
      dataIndex: 'Arguments',
      width: 200,
    },
    {
      title: '返回结果',
      dataIndex: 'ReturnValue',
      width: 200,
    },
    {
      title: 'Payload',
      dataIndex: 'Payload',
      width: 200,
    },
    {
      title: '执行时间(ms)',
      dataIndex: 'RunTime',
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


import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue'; 
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '型号标识',
      dataIndex: 'code',
      sorter: true,
      width: 150,
    },
    {
      title: '型号名称',
      dataIndex: 'deviceTypeName',
      width: 200,
    },
    {
      title: '分类',
      dataIndex: 'productCategoryId',
      width: 200,
      customRender: ({ record }) => {
        let text = record.productCategory.name;
        return h('div', { innerText: text })
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'remark',
      width: 150,
    },
  ];
}

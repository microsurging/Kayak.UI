
import { BasicColumn } from '/@/components/Table/src/types/table';
export function getAttributeColumns(): BasicColumn[] {
  return [
    {
      title: '属性标识',
      dataIndex: 'propertyId',
      sorter: true,
      width: 120,
    },
    {
      title: '属性名称',
      dataIndex: 'propertyName',
      width: 150,
    },
    {
      title: '属性值',
      dataIndex: 'propertyValue',
      width: 150,
    },
    {
      title: '日期',
      dataIndex: 'createDate',
      width: 150,
    },
  ]
}

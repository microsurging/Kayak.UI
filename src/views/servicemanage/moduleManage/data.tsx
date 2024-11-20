
import { BasicColumn } from '/@/components/Table/src/types/table';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'ModuleCode',
      fixed: 'left',
      width: 200,
    },
    {
      title: '名称',
      dataIndex: 'ModuleName',
      sorter: true,
      width: 150,
    }, 
    {
      title: '描述',
      width: 150,
      dataIndex: 'Remark',
    },
  ];
}

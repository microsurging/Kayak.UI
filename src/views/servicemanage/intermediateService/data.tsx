import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ServiceId',
      dataIndex: 'moduleName',
      width: 150,
      ellipsis:false,
      customRender: ({  record }) => {
        return record.descriptor.id;

      },
    },
    {
      title: '模块',
      ellipsis: false,
      dataIndex: 'moduleName',
      sorter: true,
      width: 270,
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      sorter: true,
      width: 150,
      customRender: ({ text }) => {
        if (text == "AggregationService")
          return "聚合服务(中间服务)";
        else
          return "微服务";

      },
    },
    {
      title: 'RoutePath',
      dataIndex: 'routePath',
      width: 200,
    }
  ];
}


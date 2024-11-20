import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Table';
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [],
  };
}

export function getAlarmColumns(): BasicColumn[] {
  return [
    {
      title: '告警时间',
      dataIndex: 'createDate',
      sorter: true,
      width: 150,
    },

    {
      title: '时长',
      dataIndex: 'duration',
      width: 200,
    },
    {
      title: '触发条件',
      dataIndex: 'thresholdCondition',
      width: 200,
    },
    {
      title: '告警原因',
      dataIndex: 'reason',
      width: 200,
    },
  ];
}

export function getImportantColumns(): BasicColumn[] {
  return [
    {
      title: '上报时间',
      dataIndex: 'createDate',
      sorter: true,
      width: 150,
    },
    {
      title: '临界限制',
      dataIndex: 'thresholdCondition',
      width: 200,
    },
    {
      title: '原始值',
      dataIndex: 'propertyValue',
      width: 200,
    },
  ];
}

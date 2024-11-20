export interface reportPropertyLogByIdParams {
  ids: [];
}
export interface reportPropertyLogPageParams {
  query: {
    productCode: string | null;
    deviceCode: string | null | undefined;
    level: string | null;
    startTime: Date | null;
    endTime: Date | null;
    page: number;
    pageSize: number;
  };
}

export interface editReportPropertyLogModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}


export interface reportPropertyLogModel {
  id: number;
  propertyId: number;
  deviceCode: string;
  propertyValue: string | null;
  thresholdValue: string;
  level: string | null;
  content: string|null;
  productCode: string | null;
  thresholdType: string;
  thresholdCondition: string;
  status: number;
  createDate: Date;
}

export interface reportPropertyLogPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: reportPropertyLogModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

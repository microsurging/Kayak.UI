export interface reportPropertyPageParams {
  query: {
    deviceId: string | null;
    beginDate: Date | null;
    endDate: Date | null;
    page: number;
    pageSize: number;
  };
}
export interface reportPropertyModel {
  id: number;
  deviceId: string;
  propertyName: string;
  propertyId: string;
  propertyValue: string;
  createDate: Date; 
}

export interface reportPropertyPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: reportPropertyModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface  reportPropertyByIdParams {
  ids: [];
}

export interface editReportPropertyModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

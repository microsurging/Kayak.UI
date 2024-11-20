export interface deviceEventPageParams {
  query: {
    deviceId: string | null;
    beginDate: Date | null;
    endDate: Date | null;
    page: number;
    pageSize: number;
  };
}
export interface deviceEventModel {
  id: number;
  deviceId: string;
  eventId: string;
  eventOutParams: string;
  eventOutParamValues: string;
  createDate: Date;
}

export interface deviceEventPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: deviceEventModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface deviceEventByIdParams {
  ids: [];
}

export interface editDeviceEventModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

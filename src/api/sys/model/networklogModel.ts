export interface networkLogPageParams {
  query: {
    networkId: string | null;
    startTime: Date | null;
    endTime: Date | null;
    page: number;
    pageSize: number;
  };
}

export interface networkLogByIdParams {
  ids: [];
}

export interface networkLogPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: networkLogModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editNetworkLogModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface networkLogModel {
  id: number;
  networkId: string;
  logLevel: string;
  networkType: string;
  eventName: string|null;
  content: string;
  CreateDate: Date; 
}

export interface networkLogPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: networkLogModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

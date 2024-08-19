export interface operateLogPageParams {
  query: {
    routePath: string | null;
    startTime: Date | null;
    endTime: Date | null;
    page: number;
    pageSize: number;
  };
}

export interface operateLogByIdParams {
  ids: [];
}

export interface operateLogPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: operateLogModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editOperateLogModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface operateLogModel {
  id: number;
  serviceId: string;
  routePath: string;
  arguments: number | null;
  returnType: string;
  payload: string | null;
  returnValue: string;
  runTime: number | null;
  remark: string;
  createDate: Date;
}

export interface sysDicPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: operateLogModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

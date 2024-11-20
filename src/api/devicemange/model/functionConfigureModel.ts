export interface functionConfigPageParams {
  query: {
    correlationId: number | null;
    correlationFrom: string | null; 
    page: number;
    pageSize: number;
  };
}

export interface funConfigDictionary {
  name: string;
  code: string;
  value: number | null;
}

export interface funConfigAggregationModel {
  id: number;
  functionId: string;
  functionName: string;
  correlationId: number | null;
  correlationFrom: string | null; 
  isAsync: boolean;
  InputIds: string;
  OutputIds: string;
  remark: string;
  createDate: Date;
  updateDate: Date;
}

export interface editParams {
  model: functionConfigModel;
}


export interface functionConfigByIdParams {
  ids: [];
}

export interface functionConfigPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: functionConfigModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editFunctionConfigModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface functionConfigModel {
  id: number;
  functionId: string;
  functionName: string;
  correlationId: number | null;
  correlationFrom: string | null;
  isAsync: boolean;
  InputIds: string;
  OutputIds: string;
  remark: string;
  createDate: Date;
  updateDate: Date;
}


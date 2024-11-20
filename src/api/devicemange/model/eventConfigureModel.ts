export interface eventConfigPageParams {
  query: {
    correlationId: number | null;
    correlationFrom: string | null;
    page: number;
    pageSize: number;
  };
}

export interface eventConfigDictionary {
  name: string;
  code: string;
  value: number | null;
}

export interface eventConfigAggregationModel {
  id: number;
  eventId: string;
  eventName: string;
  correlationId: number | null;
  correlationFrom: string | null;
  dataTypeValue: string | null;
  remark: string;
  createDate: Date;
  updateDate: Date;
}

export interface editParams {
  model: eventConfigModel;
}


export interface eventConfigByIdParams {
  ids: [];
}

export interface eventConfigPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: eventConfigModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editEventConfigModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface eventConfigModel {
  id: number;
  eventId: string;
  eventName: string;
  correlationId: number | null;
  correlationFrom: string | null;
  dataTypeValue: string | null;
  remark: string;
  createDate: Date;
  updateDate: Date;
}


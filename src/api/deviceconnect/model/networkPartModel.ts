export interface protocolManageParams {
  query: {
    protocolName: string | null;
    page: number;
    pageSize: number;
  };
}

export interface protocolManageByIdParams {
  ids: [];
}

export interface NetworkPartParams {
  query: {
    name: string;
    componentType: string;
    page: number;
    pageSize: number;
  };
}

export interface NetworkPartPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: NetworkPartModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface protocolManageModel {
  protocolCode: string;
  protocolName: string;
  componentType: string;
  status: string;
  className: string;
  fileAddress: string;

  createDate: Date;
  updateDate: Date;
}

export interface editProtocolManageModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface protocolManagePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: protocolManageModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface NetworkPartModel {
  name: string;
  componentType: string;
  clusterMode: string;
  status: string;
  enableSSL: boolean;
  ruleScript: string;
  host: string;
  port: number;
  createDate: Date;
  updateDate: Date;
  remark: string;
}

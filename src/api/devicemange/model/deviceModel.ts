export interface deviceByIdParams {
  ids: [];
}

export interface editParams {
  model: deviceModel;
}

export interface devicePageParams {
  query: {
    Id: number;
    productCode: [] | null;
    name: string | null;
    code: string | null;
    page: number;
    pageSize: number;
  };
}

export interface deviceModel {
  id: number;
  productCode: string;
  code: string;
  name: string;
  createDate: Date;
  remark: string;
}

export interface deviceAggModel {
  id: number;
  productCode: string;
  code: string;
  name: string;
  productName: string;
  gatewayName: string;
  connProtocol: string;
  protocolName: string;
  ipAddress: string;
  createDate: Date;
  remark: string;
}

export interface deviceList {
  entity: {
    Result: deviceModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editDeviceModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface devicePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: deviceModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

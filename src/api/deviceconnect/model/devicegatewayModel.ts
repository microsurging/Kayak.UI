
export interface deviceGatewayByIdParams {
  ids: [];
}

export interface editParams {
  model: devicegatewayModel;
}

export interface deviceGatewayPageParams {
  query: {
    Id: number; 
    name: string | null; 
    page: number;
    pageSize: number;
  };
}

export interface gatewayTypeDictionary {
  name: string;
  code: string;
  value: number | null;
}

export interface protocolModel {
  id: number;
  protocolCode: string;
  protocolName: string;
  connProtocol: string;
}

export interface networkPartModel {
  id: number;
  name: string;
  componentTypeId: number;
  host: string;
  port: number;
}

export interface devicegatewayModel {
  id: number;
  name: string;
  gatewaytypevalue: string;
  networkid: string;
  status: number;
  protocolCode: string;
  ipAddress: string;
  gatewayType: gatewayTypeDictionary;
  protocol: protocolModel;
  networkPart: networkPartModel;
  createDate: Date;
  remark: string;
}

export interface editDeviceGatewayModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface deviceGatewayPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: devicegatewayModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

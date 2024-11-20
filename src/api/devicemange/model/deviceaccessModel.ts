export interface editDeviceAccessModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editParams {
  model: deviceAccessModel;
}

export interface deviceAccessModel {
  id: number;
  gatewayId: number;
  productId: number;
  remark: string;
  gatewayName: string;
  connProtocol: string;
  authConfig: string;
  createDate: Date;
}

export interface deviceAccessApiModel {
  entity: {
    Result: deviceAccessModel;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

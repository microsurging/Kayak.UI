export interface editDeviceConfigModel {
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
  model: deviceConfigModel;
}

export interface deviceConfigModel {
  id: number; 
  productCode: number;
  deviceCode: string; 
  authConfig: string;
  createDate: Date;
}

export interface deviceConfigApiModel {
  entity: {
    Result: deviceConfigModel;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

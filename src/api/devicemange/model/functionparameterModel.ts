
export interface editFunctionParameters {
  key: number | null,
  list: functionParameterModel[];
}

export interface functionParameterModel {
  id: number;
  functionId: number;
  functionCode:string|null,
  deviceCode:  string |null;
  productCode: string |null;
  parameterType: string | null;
  code: string;
  name: string;
  constraint: string;
  dataTypeValue: string;
  createDate: Date;
  remark: string;
}

export interface editFunctionParameterModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface functionParameterList {
  entity: {
    Result: functionParameterModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

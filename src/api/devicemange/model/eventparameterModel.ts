
export interface editEventParameters {
  key: number | null,
  list: eventParameterModel[];
}

export interface eventParameterModel {
  id: number;
  functionId: number;
  functionCode: string | null,
  deviceCode: string | null;
  productCode: string | null;
  code: string;
  name: string;
  constraint: string;
  dataTypeValue: string;
  createDate: Date;
  remark: string;
}

export interface editEventParameterModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface eventParameterList {
  entity: {
    Result: eventParameterModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

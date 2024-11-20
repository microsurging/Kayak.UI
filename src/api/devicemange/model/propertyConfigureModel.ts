export interface propertyConfigPageParams {
  query: {
    correlationId: number | null;
    correlationFrom: string | null;
    inputText: string | null;
    page: number;
    pageSize: number;
  };
}

export interface propConfigDictionary {
  name: string;
  code: string;
  value: number | null;
}

export interface propConfigAggregationModel {
  id: number;
  propertyId: string;
  propertyName: string;
  dataTypeValue: number;
  dataTypeName: string;
  valueRange: string;
  step: number;
  unitValue: number;
  unitName: string;
  remark: string;
  createDate: Date;
  updateDate: Date;
  dataType: propConfigDictionary;
}

export interface editParams {
  model: propertyConfigModel;
}


export interface propertyConfigByIdParams {
  ids: [];
}

export interface propertyConfigPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: propertyConfigModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editPropertyConfigModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface propertyConfigModel {
  id: number;
  propertyId: string;
  propertyName: string;
  dataTypeValue: number;
  dataTypeName: string;
  valueRange: string;
  step: number;
  unitValue: number;
  unitName: string;
  remark: string;
  createDate: Date;
  updateDate: Date;
}


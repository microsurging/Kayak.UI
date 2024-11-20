
export interface deviceTypeByIdParams {
  ids: [];
}

export interface editParams {
  model: deviceTypeModel;
}

export interface deviceTypePageParams {
  query: {
    deviceTypeCode: string | null;
    organizationId: number | null;
    protocolCode: string | null; 
    page: number;
    pageSize: number;
  };
}

export interface deviceTypeModel {
  id: number;
  code: string;
  deviceTypeName: string;
  productCategoryId: number | null;
  organizationId: number | null;
  connProtocolCode: string | null;
  protocolCode: string | null;
  deviceTypeCode: string | null;
  createDate: Date;
  remark: string;
}

export interface deviceTypeAggregationModel {
  id: number;
  code: string;
  deviceTypeName: string;
  productCategoryId: number|null;
  organizationId: number | null;
  connProtocolCode: string | null;
  protocolCode: string|null;
  deviceTypeCode: string |null;
  createDate: Date;
  remark: string;
  productCategory: dataDictionary;
  organization: dataDictionary;
  protocol: dataDictionary;
}

export interface dataDictionary {
  name: string;
  code: string;
  id: number | null;
}

export interface deviceTypeList {
  entity: {
    Result: deviceTypeModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editDeviceTypeModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface deviceTypePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: deviceTypeModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface deviceTypeAggregationPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: deviceTypeAggregationModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editParams {
  model: registrycenterModel;
}

export interface editRegistryCenterModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface registryCenterPageParams {
  query: {
    registryCenterType: number | null;
    name: string | null;
    page: number;
    pageSize: number;
  };
}

export interface registrycenterModel {
  id: number;
  name: string;
  registryCenterType: number | null;
  path: string | null;
  host: string | null;
  port: number | null;
  remark: string;
  createDate: Date;
}

export interface regcenterAggregationModel {
  id: number;
  name: string;
  registryCenterType: number | null;
  regCenterTypeName: string | null;
  path: string | null;
  host: string | null;
  port: number | null;
  remark: string;
  createDate: Date;
  regCenterType: regCenterDictionary;
}

export interface regcenterAggregationPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: regcenterAggregationModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface registryCenterByIdParams {
  ids: [];
}

export interface registryCenterList {
  entity: {
    Result: registrycenterModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface regCenterDictionary {
  name: string;
  code: string;
  value: number | null;
}

export interface registryCenterPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: registrycenterModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

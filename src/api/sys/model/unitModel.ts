export interface sysUnitPageParams {
  query: {
    name: string | null;
    page: number;
    pageSize: number;
  };
}

export interface editParams {
  model: sysUnitModel;
}


export interface sysUnitByIdParams {
  ids: [];
}

export interface sysUnitPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: sysUnitModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editUnitModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysUnitList {
  entity: {
    Result: sysUnitModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysUnitModel {
  id: number;
  name: string;
  value: number | null;
  remark: string;
  createDate: Date;
  updateDate: Date;
}


export interface sysDataTypePageParams {
  query: {
    name: string | null;
    page: number;
    pageSize: number;
  };
}

export interface editParams {
  model: sysDataTypeModel;
}

export interface sysDataTypeByIdParams {
  ids: [];
}

export interface sysDataTypePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: sysDataTypeModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editSysDataTypeModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysDataTypeModel {
  id: number;
  name: string;
  value: number | null;
  defaultVaule: string;
  remark: string;
  createDate: Date;
  updateDate: Date;
}


export interface sysDictionaryQuery {
  query: {
    code: string | null;
    name: string | null;
    parentCode: string | null;
  };
}

export interface sysDicByIdParams {
  ids: [];
}

export interface aggregationSysDicByIdParams {
  parentCode: string | null;
  ids: [];
}

export interface sysDicByParentCodeParams {
  parentCode: string | null;
}

export interface editParams {
  model: sysDicModel;
}

export interface sysDicPageParams {
  query: {
    code: string | null;
    parentCode: string | null;
    page: number;
    pageSize: number;
  };
}

export interface sysDicModel {
  id: number;
  name: string;
  code: string;
  value: string | null;
  parentCode: string;
  status: number;
  remark: string;
  isShow: boolean;
  createDate: Date;
  updateDate: Date;
}

export interface sysDicListModel {
  entity: {
    Result: sysDicModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editSysDicModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysDicPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: sysDicModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

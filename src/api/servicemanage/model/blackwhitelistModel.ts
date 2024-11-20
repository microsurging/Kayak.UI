export interface blackwhitelistByIdParams {
  ids: [];
}

export interface blackwhitelistParams {
  query: {
    routePathPattern: string | null;
    page: number;
    pageSize: number;
  };
}

export interface editBlackWhiteListModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}
export interface editBlackWhiteListParams {
  model: blackWhiteListModel;
}
export interface blackWhiteListModel {
  id: number|null;
  routePathPattern: string | null;
  blackList: string;
  whiteList: string;
  status: string | null; 
  remark: string | null;
  createDate: Date;
  updateDate: Date;
}

export interface blackWhiteListPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: blackWhiteListModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

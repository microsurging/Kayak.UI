export interface moduleByIdParams {
  ids: [];
}

export interface moduleParams {
  query: {
    moduleCode: string | null;
    page: number;
    pageSize: number;
  };
}

export interface editModuleModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}
export interface editModuleParams {
  model: moduleModel;
}
export interface moduleModel {
  moduleCode: string;
  fileId: string | null;
  moduleName: string;
  moduleType: string;
  fileAddress: string | null;
  moduleMode: string | null;
  remark: string | null;
  createDate: Date;
  updateDate: Date;
}

export interface modulePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: moduleModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

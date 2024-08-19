import { Data } from 'ant-design-vue/es/_util/type';

export interface productCategoryByIdParams {
  ids: [];
}

export interface editParams {
  model: productCategoryModel;
}

export interface productCategoryPageParams {
  query: {
    name: string | null;
    categoryId: string | null;
    level: number | null;
    code: string | null;
    page: number;
    pageSize: number;
  };
}

export interface productCategoryModel {
  id: number;
  categoryName: string;
  categoryId: string;
  level: number;
  isChildren: boolean;
  code: string;
  createDate: Data;
  remark: string;
}

export interface sysPrdCategoryList {
  entity: {
    Result: productCategoryModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editPrdCategoryModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface sysPrdCategoryPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: productCategoryModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

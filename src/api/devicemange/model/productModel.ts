import { Data } from 'ant-design-vue/es/_util/type';

export interface productByIdParams {
  ids: [];
}

export interface editParams {
  model: productModel;
}

export interface productPageParams {
  query: {
    productCode: string | null;
    organizationId: number | null;
    categoryId: number | null;
    protocol: number | null;
    deviceType: number | null;
    page: number;
    pageSize: number;
  };
}

export interface productModel {
  id: number;
  productCode: string;
  productName: string;
  categoryId: number;
  organizationId: number;
  protocol: number;
  deviceType: number;
  createDate: Data;
  remark: string;
}

export interface prdAggregationModel {
  id: number;
  productCode: string;
  productName: string;
  categoryId: number;
  organizationId: number;
  protocol: number;
  deviceType: number;
  createDate: Data;
  remark: string;
  category: prdDictionary;
  prdProtocol: prdDictionary;
  prdDeviceType: prdDictionary;
}

export interface prdDictionary {
  name: string;
  code: string;
  value: number | null;
}

export interface productList {
  entity: {
    Result: productModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface editProductModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface productPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: productModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface prdAggregationPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: prdAggregationModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

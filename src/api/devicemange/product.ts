import { defHttp } from '/@/utils/http/axios';
import {
  productList,
  productPageParams,
  productPageModel,
  prdAggregationPageModel,
  productByIdParams,
  editProductModel,
  editParams,
} from './model/productModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getproductbycondition = '/product/getproductbycondition',
  getpageasync = '/product/getpageasync',
  aggregation_getproducts = '/prdaggregation/getproducts',
  aggregation_getpageasync = '/prdaggregation/getpageasync',
  deletebyId = '/product/deletebyId',
  validate = '/product/validate',
  modify = '/product/modify',
  open = '/product/open',
  stop = '/product/stop',
  add = '/product/add',
}
export function getproductbyconditionApi(
  params: productPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<productList>(
    {
      url: Api.getproductbycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getproductsApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<productList>(
    {
      url: Api.aggregation_getproducts,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(
  params: productPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<prdAggregationPageModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(params: productPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<productPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: productByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProductModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function openApi(params: productByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProductModel>(
    {
      url: Api.open,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function stopApi(params: productByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProductModel>(
    {
      url: Api.stop,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProductModel>(
    {
      url: Api.modify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProductModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function validateApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProductModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

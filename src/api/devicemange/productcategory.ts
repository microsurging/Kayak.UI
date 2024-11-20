import { defHttp } from '/@/utils/http/axios';
import {
  sysPrdCategoryList,
  productCategoryPageParams,
  sysPrdCategoryPageModel,
  productCategoryByIdParams,
  editPrdCategoryModel,
  editParams,
} from './model/productCategoryModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getproductcategorybycondition = '/productcategory/getproductcategorybycondition',
  getpageasync = '/productcategory/getpageasync',
  deletebyId = '/productcategory/deletebyId',
  validate = '/productcategory/validate',
  modify = '/productcategory/modify',
  add = '/productcategory/add',
  addchildren = '/productcategory/addchildren',
  getlastchild ='/productcategory/getlastchild'
}
export function getproductcategorybyconditionApi(
  params: productCategoryPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysPrdCategoryList>(
    {
      url: Api.getproductcategorybycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(
  params: productCategoryPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysPrdCategoryPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getlastchildApi( 
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysPrdCategoryList>(
    {
      url: Api.getlastchild, 
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: productCategoryByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editPrdCategoryModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editPrdCategoryModel>(
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
  return defHttp.post<editPrdCategoryModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addchildrenApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editPrdCategoryModel>(
    {
      url: Api.addchildren,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function validateApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editPrdCategoryModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

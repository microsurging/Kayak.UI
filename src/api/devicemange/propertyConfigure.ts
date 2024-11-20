import { defHttp } from '/@/utils/http/axios';
import {
  propertyConfigPageParams,
  propertyConfigPageModel,
  propertyConfigByIdParams,
  editPropertyConfigModel,
  editParams,
  propConfigAggregationModel,
} from './model/propertyConfigureModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  aggregation_getpageasync = '/propconfigaggregation/getpageasync',
  getpageasync = '/propertyconfigure/getpageasync',
  deletebyId = '/propertyconfigure/deletebyId',
  validate = '/propertyconfigure/validate',
  modify = '/propertyconfigure/modify',
  add = '/propertyconfigure/add',
}

export function getpageasyncApi(params: propertyConfigPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<propertyConfigPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(params: propertyConfigPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<propConfigAggregationModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: propertyConfigByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editPropertyConfigModel>(
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
  return defHttp.post<editPropertyConfigModel>(
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
  return defHttp.post<editPropertyConfigModel>(
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
  return defHttp.post<editPropertyConfigModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

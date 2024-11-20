import { defHttp } from '/@/utils/http/axios';
import {
  functionConfigPageParams,
  functionConfigPageModel,
  functionConfigByIdParams,
  editFunctionConfigModel,
  editParams,
  funConfigAggregationModel,
} from './model/functionConfigureModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  aggregation_getpageasync = '/funconfigaggregation/getpageasync',
  getpageasync = '/functionconfigure/getpageasync',
  deletebyId = '/functionconfigure/deletebyId',
  validate = '/functionconfigure/validate',
  modify = '/functionconfigure/modify',
  add = '/functionconfigure/add',
}

export function getpageasyncApi(params: functionConfigPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<functionConfigPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(params: functionConfigPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<funConfigAggregationModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: functionConfigByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editFunctionConfigModel>(
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
  return defHttp.post<editFunctionConfigModel>(
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
  return defHttp.post<editFunctionConfigModel>(
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
  return defHttp.post<editFunctionConfigModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

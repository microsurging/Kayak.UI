import { defHttp } from '/@/utils/http/axios';
import {
  moduleParams,
  modulePageModel,
  moduleByIdParams,
  editModuleModel,
  editModuleParams,
} from './model/moduleModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/module/getpageasync',
  deletebyId = '/module/deletebyId',
  modify = '/module/modify',
  modify_agg = '/moduleaggregation/modify',
  add_agg = '/moduleaggregation/add',
  add = '/module/add',
}
export function getpageasyncApi(params: moduleParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<modulePageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: moduleByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editModuleModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addApi(params: editModuleParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editModuleModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addAggApi(params: editModuleParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editModuleModel>(
    {
      url: Api.add_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyAggApi(params: editModuleParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editModuleModel>(
    {
      url: Api.modify_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editModuleParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editModuleModel>(
    {
      url: Api.modify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

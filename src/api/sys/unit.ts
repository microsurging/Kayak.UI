import { defHttp } from '/@/utils/http/axios';
import {
  sysUnitPageParams,
  sysUnitPageModel,
  sysUnitByIdParams,
  editUnitModel,
  editParams,
  sysUnitList
} from './model/unitModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/sysunit/getpageasync',
  deletebyId = '/sysunit/deletebyId',
  validate = '/sysunit/validate',
  modify = '/sysunit/modify',
  add = '/sysunit/add',
  getlist='/sysunit/getlist'
}

export function getpageasyncApi(params: sysUnitPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<sysUnitPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: sysUnitByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editUnitModel>(
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
  return defHttp.post<editUnitModel>(
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
  return defHttp.post<editUnitModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getListApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<sysUnitList>(
    {
      url: Api.getlist,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function validateApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editUnitModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

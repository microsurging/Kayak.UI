import { defHttp } from '/@/utils/http/axios';
import {
  sysDataTypePageParams,
  sysDataTypePageModel,
  sysDataTypeByIdParams,
  editSysDataTypeModel,
  editParams,
} from './model/datatypeModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/sysdatatype/getpageasync',
  deletebyId = '/sysdatatype/deletebyId',
  validate = '/sysdatatype/validate',
  modify = '/sysdatatype/modify',
  add = '/sysdatatype/add',
}

export function getpageasyncApi(params: sysDataTypePageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<sysDataTypePageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: sysDataTypeByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDataTypeModel>(
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
  return defHttp.post<editSysDataTypeModel>(
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
  return defHttp.post<editSysDataTypeModel>(
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
  return defHttp.post<editSysDataTypeModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

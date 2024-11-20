import { defHttp } from '/@/utils/http/axios';
import {
  sysDicPageModel,
  sysDicListModel,
  sysDictionaryQuery,
  sysDicByParentCodeParams,
  editSysDicModel,
  editParams,
  sysDicByIdParams,
  sysDicPageParams,
  aggregationSysDicByIdParams
} from './model/dictionarymanageModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getsysdictionarybycondition = '/sysdictionary/getsysdictionarybycondition',
  getpageasync = '/sysdictionary/getpageasync',
  deletebyId = '/sysdictionary/deletebyId',
  stop = '/sysdictionary/stop',
  open = '/sysdictionary/open',
  validate = '/sysdictionary/validate',
  modify = '/sysdictionary/modify',
  add = '/sysdictionary/add',
  getsysdicbyparentcode = '/sysdictionary/getsysdictionarybyparentcode',
  getaggsysdicbyparcode = '/sysdicaggregation/getsysdictionarybyparentcode',
  aggregationAdd = '/sysdicaggregation/add',
  aggregationModify = '/sysdicaggregation/modify',
  aggregationDeletebyId = '/sysdicaggregation/deletebyId',
}
export function getsysdictionarybyconditionApi(
  params: sysDictionaryQuery,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysDicListModel>(
    {
      url: Api.getsysdictionarybycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getsysdicbyparentcodeApi(
  params: sysDicByParentCodeParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysDicListModel>(
    {
      url: Api.getsysdicbyparentcode,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggsysdicbyparcodeApi(
  params: sysDicByParentCodeParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysDicListModel>(
    {
      url: Api.getaggsysdicbyparcode,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(params: sysDicPageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<sysDicPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function stopApi(params: sysDicByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.stop,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function openApi(params: sysDicByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.open,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: sysDicByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function aggregationDeletebyIdApi(params: aggregationSysDicByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.aggregationDeletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
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
  return defHttp.post<editSysDicModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function aggregationModifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.aggregationModify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function aggregationAddApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.aggregationAdd,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function validateApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysDicModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

import { defHttp } from '/@/utils/http/axios';
import {
  networkPartParams,
  networkPartPageModel,
  networkPartAggregationModel,
  editNetworkPartModel,
  networkPartByIdParams,
  editNetworkPartParams,
  networkPartList
} from './model/networkPartModel';

import { ErrorMessageMode } from '/#/axios';

enum Api { 
  add = '/networkpart/add',
  getpageasync = '/networkpart/getpageasync', 
  modify = '/networkpart/modify',
  aggregationModify = '/netpartaggregation/modify',
  getnetworkpartbycondition ='/networkpart/getnetworkpartbycondition',
  open = '/networkpart/open',
  stop = '/networkpart/stop',
  validate = '/networkpart/validate',
  deletebyId = '/networkpart/deletebyId',
  createnetwork = '/netpartaggregation/createnetwork',
  shundownnetwork = '/netpartaggregation/shundownnetwork',
  getaggregationpageasync = '/netpartaggregation/getpageasync',
}
export function getpageasyncApi(params: networkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<networkPartPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getnetworkpartbyconditionApi(params: networkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<networkPartList>(
    {
      url: Api.getnetworkpartbycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(params: networkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<networkPartAggregationModel>(
    {
      url: Api.getaggregationpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: networkPartByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function createnetworkApi(params: { id: number|null }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.createnetwork,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function shundownnetworkApi(params: { id: number | null }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.shundownnetwork,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function openApi(params: networkPartByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.open,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function stopApi(params: networkPartByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.stop,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function aggregationModifyApi(params: editNetworkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.aggregationModify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editNetworkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.modify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addApi(params: editNetworkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function validateApi(params: editNetworkPartParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editNetworkPartModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}




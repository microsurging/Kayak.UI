import { defHttp } from '/@/utils/http/axios';
import {
  editParams,
  registryCenterList,
  editRegistryCenterModel,
  registryCenterPageParams,
  regcenterAggregationPageModel,
  registryCenterByIdParams,
  registryCenterPageModel,
} from './model/registrycenterModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getlist = '/registryCenter/getlist',
  getpageasync = '/registryCenter/getpageasync/query',
  aggregation_getpageasync = '/regcenteraggregation/getpageasync/query',
  deletebyId = '/registryCenter/deletebyId',
  modify = '/registryCenter/modify',
  add = '/registryCenter/add',
}

export function getpageasyncApi(
  params: registryCenterPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<registryCenterPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getlistApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<registryCenterList>(
    {
      url: Api.getlist,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getaggregationpageasyncApi(
  params: registryCenterPageParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<regcenterAggregationPageModel>(
    {
      url: Api.aggregation_getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: registryCenterByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editRegistryCenterModel>(
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
  return defHttp.post<editRegistryCenterModel>(
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
  return defHttp.post<editRegistryCenterModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

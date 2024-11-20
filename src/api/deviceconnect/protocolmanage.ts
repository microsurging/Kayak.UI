import { defHttp } from '/@/utils/http/axios';
import {
  protocolManageParams,
  protocolManagePageModel,
  protocolManageByIdParams,
  editProtocolManageModel,
  protocolManageList,
  editProtocolManageParams,
} from './model/networkPartModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/protocolmanage/getpageasync',
  deletebyId = '/protocolmanage/deletebyId',
  cancelpublish = '/protocolmanage/cancelpublish',
  cancelpublish_agg = '/protocolmanageagg/cancelpublish',
  republish = '/protocolmanage/republish',
  republish_agg = '/protocolmanageagg/republish',
  getprotocols = '/protocolmanage/getprotocols',
  modify = '/protocolmanage/modify',
  add = '/protocolmanage/add',
  add_agg = '/protocolmanageagg/add',
  modify_agg = '/protocolmanageagg/modify',
}
export function getpageasyncApi(params: protocolManageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<protocolManagePageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getprotocolsApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<protocolManageList>(
    {
      url: Api.getprotocols, 
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function cancelpublishApi(
  params: protocolManageByIdParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.cancelpublish,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function cancelpublishaggApi(
  params: protocolManageByIdParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.cancelpublish_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function republishaggApi(params: protocolManageByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.republish_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}


export function republishApi(params: protocolManageByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.republish,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: protocolManageByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addApi(params: editProtocolManageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addAggApi(params: editProtocolManageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.add_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}


export function modifyApi(params: editProtocolManageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.modify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyAggApi(params: editProtocolManageParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editProtocolManageModel>(
    {
      url: Api.modify_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

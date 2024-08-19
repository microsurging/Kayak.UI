import { defHttp } from '/@/utils/http/axios';
import {
  protocolManageParams,
  protocolManagePageModel,
  protocolManageByIdParams,
  editProtocolManageModel,
} from './model/networkPartModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/protocolmanage/getpageasync',
  deletebyId = '/protocolmanage/deletebyId',
  cancelpublish = '/protocolmanage/cancelpublish',
  republish = '/protocolmanage/republish',
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

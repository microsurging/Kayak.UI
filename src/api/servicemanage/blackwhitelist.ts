import { defHttp } from '/@/utils/http/axios';
import {
  blackwhitelistParams,
  blackWhiteListPageModel,
  blackwhitelistByIdParams,
  editBlackWhiteListModel,
  editBlackWhiteListParams,
} from './model/blackwhitelistModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getpageasync = '/blackwhitelist/getpageasync',
  deletebyId = '/blackwhitelist/deletebyId',
  modify = '/blackwhitelist/modify',
  modify_agg = '/blackwhitelistagg/modify',
  add_agg = '/blackwhitelistagg/add',
  add = '/blackwhitelist/add',
  enable_agg = '/blackwhitelistagg/enable',
  disable_agg = '/blackwhitelistagg/disable',
}
export function getpageasyncApi(params: blackwhitelistParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<blackWhiteListPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: blackwhitelistByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function enableAggApi(params: blackwhitelistByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.enable_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function disableAggApi(params: blackwhitelistByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.disable_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}


export function addApi(params: editBlackWhiteListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.add,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function addAggApi(params: editBlackWhiteListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.add_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyAggApi(params: editBlackWhiteListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.modify_agg,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editBlackWhiteListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editBlackWhiteListModel>(
    {
      url: Api.modify,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

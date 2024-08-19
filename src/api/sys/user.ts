import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  editParams,
  sysUserQuery,
  sysUserPageModel,
  sysUserByIdParams,
  editSysUserModel,
  sysUserModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/oauth2/token',
  Logout = '/logout',
  GetUserInfo = '/sysuser/getuserinfo',
  GetPermCode = '/getPermCode',
  getpageasync = '/sysuser/getpageasync',
  deletebyId = '/sysuser/deletebyId',
  changeenable = '/sysuser/changeenable',
  changedisable = '/sysuser/changedisable',
  modify = '/sysuser/modify',
  add = '/sysuser/add',
  validate = '/sysuser/validate',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(params: sysUserQuery, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<sysUserPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function changeenableApi(params: sysUserByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysUserModel>(
    {
      url: Api.changeenable,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function changedisableApi(params: sysUserByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysUserModel>(
    {
      url: Api.changedisable,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function modifyApi(params: editParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysUserModel>(
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
  return defHttp.post<editSysUserModel>(
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
  return defHttp.post<editSysUserModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: sysUserByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysUserModel>(
    {
      url: Api.deletebyId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

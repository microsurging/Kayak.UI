import { defHttp } from '/@/utils/http/axios';
import {
  sysOrgPageModel,
  sysOrgListModel,
  sysOrganizationQuery,
  editSysOrgModel,
  editParams,
  sysOrgByIdParams,
} from './model/orgmanageModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  getsysorganizationbycondition = '/sysorganization/getsysorganizationbycondition',
  getpageasync = '/sysorganization/getpageasync',
  deletebyId = '/sysorganization/deletebyId',
  validate = '/sysorganization/validate',
  modify = '/sysorganization/modify',
  add = '/sysorganization/add',
}
export function getsysorganizationbyconditionApi(
  params: sysOrganizationQuery,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<sysOrgListModel>(
    {
      url: Api.getsysorganizationbycondition,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getpageasyncApi(params: sysOrganizationQuery, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<sysOrgPageModel>(
    {
      url: Api.getpageasync,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function deletebyIdApi(params: sysOrgByIdParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editSysOrgModel>(
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
  return defHttp.post<editSysOrgModel>(
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
  return defHttp.post<editSysOrgModel>(
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
  return defHttp.post<editSysOrgModel>(
    {
      url: Api.validate,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

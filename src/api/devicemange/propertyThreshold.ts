import { defHttp } from '/@/utils/http/axios';
import {
  editPropertyThresholdModel,
  editPropertyThresholds,
  propertyThresholdList
} from './model/propertyThresholdModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  edit = '/propertythreshold/edit', 
  getbypropertyid = '/propertythreshold/getbypropertyid'
}


export function editApi(params: editPropertyThresholds, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<editPropertyThresholdModel>(
    {
      url: Api.edit,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getbypropertyidApi(params: { propertyId: number|null }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<propertyThresholdList>(
    {
      url: Api.getbypropertyid,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}


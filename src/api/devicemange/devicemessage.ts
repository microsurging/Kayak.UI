import { defHttp } from '/@/utils/http/axios';
 
import { ErrorMessageMode } from '/#/axios';

enum Api {
  getdevicemsgtotal = '/devicemessageagg/getdevicemsgtotal',
  getgroupstatistics ='/devicemessageagg/getgroupstatistics',
}

export function getdevicemsgtotalApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getdevicemsgtotal,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getgroupstatisticsApi(params: { startDate: Date, endDate: Date }, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      url: Api.getgroupstatistics,
      params
    },
    {
      errorMessageMode: mode,
    },
  );
}

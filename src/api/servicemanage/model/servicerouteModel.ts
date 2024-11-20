export interface addressModel {}
export interface serviceRouteModel {
  address: addressModel[];
  serviceDescriptor: serviceDescriptorModel;
}

export interface getParam {
  registryCenterType: number;
  serviceId: string;
}
export interface getStatisticsParam {
  registryCenterType: number;
}

export interface editModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}
export interface serviceStatisticsModel {
  serviceTotal: number;
  serviceRunCount: number;
  serviceAbnormalCount: number;
  serviceNodeCount: number;
}

export interface serviceRoutePageParams {
  query: {
    mode: string | null;
    registryCenterType: number | null;
    serviceRoute: number | null;
    page: number;
    pageSize: number;
  };
}

export interface modifyAddressParams {
  model: {
    wt: number;
    ip: string;
    port: number;
    serviceId: string;
    registryCenterType: number | null;
  };
}

export interface editServiceDescriptorParams {
  model: {
    id: string | null;
    metadatas: { enableAuthorization: boolean; authType: string } | null;
    token: string | null;
    routePath: string | null;
    serviceId: string;
    registryCenterType: number | null;
  };
}

export interface serviceDescriptorModel {
  token: string | null;
  id: string | null;
  routePath: string | null;
  metadatas: object;
}

export interface serviceDescriptorPageModel {
  entity: {
    Result: serviceDescriptorModel;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface serviceCommandModel {
  entity: {
    Result: object;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface addressPageModel {
  entity: {
    Result: addressModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface serviceRoutePageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: serviceRouteModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

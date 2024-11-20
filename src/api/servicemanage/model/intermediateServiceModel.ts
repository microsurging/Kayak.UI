export interface serviceDescriptorModel {
  token: string | null;
  id: string | null;
  routePath: string | null;
  metadatas: object;
}

export interface serviceEntryPageParams {
  query: {
    serviceType: string | null;
    moduleName: string | null;
    routePath: string | null;
    page: number;
    pageSize: number;
  };
}


export interface serviceEntryModel {
  methods: string | null;
  routePath: string | null;
  type: string | null;
  methodName: object;
  serviceId: string | null;
}

export interface serviceEntryPageModel {
  entity: {
    Result: {
      pageIndex: number;
      pageCount: number;
      total: number;
      pageSize: number;
      items: serviceEntryModel[];
    };
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
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

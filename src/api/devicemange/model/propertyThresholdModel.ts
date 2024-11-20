export interface editParams {
  thresholds: editPropertyThresholds;
}

export interface editPropertyThresholds {
  propertyId: number|null,
  list: propertyThresholdModel[];
}

export interface propertyThresholdModel{
  id: number;
  propertyId: number;
  thresholdValue: number;
  thresholdType: string;
  thresholdLevel: string;
  createDate: Date;
  remark: string;
}

export interface editPropertyThresholdModel {
  entity: {
    Result: Boolean;
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

export interface propertyThresholdList {
  entity: {
    Result: propertyThresholdModel[];
    Code: number;
    Msg: string;
  };
  isSucceed: boolean;
  message: string;
  statusCode: number;
}

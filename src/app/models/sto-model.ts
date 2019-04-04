export interface STOModel {
  active: string;
  car_model: string;
  ext_color: string;
  first_mile_guid: string;
  fsc: string;
  fsc_name: string;
  gate_out_created_by: string;
  gate_out_created_date: string;
  gate_out_date: string;
  gate_out_updated_by: string;
  gate_out_updated_date: string;
  int_color: string;
  lot_num: string;
  odn: string;
  receipt_created_by: string;
  receipt_created_date: string;
  receipt_updated_by: string;
  receipt_updated_date: string;
  rsy_code: string;
  sto_created_by: string;
  sto_created_date: string;
  sto_date: string;
  sto_updated_by: string;
  sto_updated_date: string;
  sto_value: number;
  vin_num: string;
}

export interface CompactSTOModel {
  vin_num: string;
  ext_color: string;
  first_mile_guid: string;
  int_color: string;
  fsc_name: string;
}

export enum STOListTypes {
  Active,
  GateOutPending,
  GateOutHistory,
  ReceivePending,
  ReceiveHistory
}

export interface fetchStateType {
  status: string;
  error: null | any;
  data: any[];
}

export interface fetchActionType {
  type: 'FETCHING' | 'FETCHED' | 'FETCH_ERROR';
  payload?: any;
}
import {JsonOutputType, JsonSortType} from '../models/models';

export const DEFAULT_JSON_OUTPUT: JsonOutputType = {
  fromRecord: 0,
  fetchCount: 0,
  subject: '',
  outType: 'list',
  report: '',
  offline: false,
};

export const DEFAULT_JSON_SORT: JsonSortType = {
  sort1: '',
  sort2: '',
  isDescending1: false,
  isDescending2: false,
};

export interface AddResponse {
  outNumber?: number;
  outMessage?: string;
  list?: Array<{
    title: string;
    [key: string]: any;
  }>;
}

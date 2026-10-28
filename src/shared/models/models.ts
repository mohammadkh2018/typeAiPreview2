// search
export interface JsonOutputType {
  fromRecord: number;
  fetchCount: number;
  subject: string;
  outType: string;
  report: string;
  offline: boolean;
}

export interface JsonSortType {
  sort1: string;
  sort2: string;
  isDescending1: boolean;
  isDescending2: boolean;
}

export interface ReportItem {
  id: number;
  key: string;
  title: string;
}

export interface SortItem {
  key: string;
  title: string;
}

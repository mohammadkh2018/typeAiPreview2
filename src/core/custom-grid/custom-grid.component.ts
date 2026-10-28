import {AfterViewInit, ChangeDetectorRef, Component, DoCheck, EventEmitter, HostListener, Input, Output,} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface GridFont {
  name?: string;
  size?: number;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  titleColor?: string;
}

interface GridTitle {
  text: string;
  height?: number;
  font?: GridFont;
}

interface GridColumn {
  title: string;
  fieldName: string;
  width?: string;
  align?: string;
  titleAlign?: string;
  multiLine?: boolean;
  direction?: string;
  sort?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  hide?: boolean;
  font?: GridFont;
  bold?: boolean;
  italic?: boolean;
  size?: number;
  name?: string;
  titleColor?: string;
  buttons?: Array<{
    type: string;
    icon: string;
    color?: string;
    tooltip?: string;
    status?: boolean;
  }>;
}

interface GridSelection {
  active: boolean;
  rowColor?: string;
  fieldColor?: string;
}

interface GridConfig {
  title?: GridTitle;
  multiSelection?: boolean;
  rowSelection?: GridSelection;
  fieldSelection?: GridSelection;
  direction?: 'rtl' | 'ltr';
  columnsTitleShow?: boolean;
  headerColor?: string;
  columns: GridColumn[];
  data: any[];
  sortColumn?: string;
  sortAscending?: boolean;
  useActionResolve?: boolean;
}

export interface GridActionEvent {
  action: string;
  row: any;
  resolve: () => void;
}

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
})
export class CustomGridComponent implements AfterViewInit, DoCheck {

  constructor(private cdr: ChangeDetectorRef) {}
  private _loading = new WeakMap<any, Record<string, boolean>>();

  heightGrid = 0;
  heightContainer = 0;
  loadIs = false;
  originalData: any[] = [];
  selectedRows: any[] = [];
  selectedField = '';
  getData = { active: false, count: 0 };

  @Input() gridJson: GridConfig = {
    title: {
      text: 'Grid Title',
      height: 50,
      font: {
        name: 'b nazanin',
        size: 12,
        bold: true,
        italic: false,
        color: 'red',
      },
    },
    multiSelection: true,
    rowSelection: { active: true, rowColor: '#f5ee20' },
    fieldSelection: { active: true, fieldColor: '#de1d10' },
    direction: 'rtl',
    columnsTitleShow: true,
    headerColor: '',
    columns: [],
    data: [],
  };
  @Input() direction: 'rtl' | 'ltr' = 'rtl';
  @Input() headerId = '';
  @Input() heightContainerInput = 0;
  @Input() changeHeight = true;
  @Input() otherGridStyle = false;

  @Output() action = new EventEmitter<any>();
  @Output() addList = new EventEmitter<string>();
  @Output() selectionChanged = new EventEmitter<any[]>();

  private static extractFontStyle(font: GridFont): any {
    const style: any = {};
    if (font.color) { style.color = font.color; }
    if (font.size) { style.fontSize = font.size + 'px'; }
    if (font.bold) { style.fontWeight = font.bold ? 'bold' : 'normal'; }
    if (font.italic) { style.fontStyle = font.italic ? 'italic' : 'normal'; }
    if (font.name) { style.fontFamily = font.name; }
    return style;
  }

  /** --- Lifecycle Hooks --- */
  ngAfterViewInit(): void {
    this.updateHeights();
    this.loadIs = true;
  }

  ngDoCheck(): void {
    if (this.gridJson?.data && this.getData?.active) {
      if (this.gridJson.data.length !== this.getData.count) {
        this.getData.active = false;
      }
    } else if (this.gridJson?.data && this.originalData.length === 0) {
      this.originalData = [...this.gridJson.data];
    }
  }

  /** --- HostListeners --- */

  @HostListener('window:resize')
  onResize(): void {
    if (this.changeHeight === true) {
      this.updateHeights();
    }
  }

  /** --- Public Methods --- */
  onScroll(event: any): void {
    const threshold = 10;
    const element = event.target;
    const distanceToBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;

    if (distanceToBottom <= threshold && !this.getData.active) {
      this.getData = {
        active: true,
        count: this.gridJson.data.length,
      };
      this.addList.emit('');
    }
  }

  public selectFirstRow(): void {
    if (!this.gridJson || !this.gridJson.data || this.gridJson.data.length === 0) {
      this.selectedRows = [];
      return;
    }
    this.selectedRows = [this.gridJson.data[0]];
  }


  private normType(btn: { type: string } | null | undefined): string {
    return (btn?.type ?? '').trim();
  }

  isLoading(row: any, btn: { type: string }): boolean {
    const t = this.normType(btn);
    const rec = this._loading.get(row);
    return !!rec && !!rec[t];
  }

  private setLoading(row: any, btn: { type: string }, val: boolean): void {
    const t = this.normType(btn);
    let rec = this._loading.get(row);
    if (!rec) { rec = {}; this._loading.set(row, rec); }
    rec[t] = val;
  }
// @ts-ignore
  onButtonClick(btn: GridColumn['buttons'][number], row: any, event?: MouseEvent): void {
    event?.stopPropagation();
    const type = this.normType(btn);

    if (!this.gridJson?.useActionResolve) {
      this.action.emit({ action: type, row });
      return;
    }

    this.setLoading(row, btn, true);
    this.cdr.detectChanges();

    setTimeout(() => {
      this.action.emit({
        action: type,
        row,
        resolve: () => {
          this.setLoading(row, btn, false);
          this.cdr.markForCheck();
        }
      });
    }, 0);
  }

  selectRow(row: any): void {
    if (this.gridJson.rowSelection?.active) {
      this.selectedRows = [row];
    }
  }

  isSelectedRow(row: any, index: number): string | undefined {
    if (this.selectedRows.length === 0 && index === 0) {
      return this.gridJson.rowSelection?.rowColor;
    }
    return this.selectedRows.indexOf(row) !== -1
      ? this.gridJson.rowSelection?.rowColor
      : undefined;
  }

  selectField(col: any): void {
    if (this.gridJson.fieldSelection?.active) {
      this.selectedField = col.title;
    }
  }

  isSelectedField(row: any, col: any): string | undefined {
    return this.selectedRows.indexOf(row) !== -1 && this.selectedField === col.title
      ? this.gridJson.fieldSelection?.fieldColor
      : undefined;
  }

  checkboxStyle(direction: any): any {
    return direction === 'ltr'
      ? { 'margin-left': '-10px', 'margin-right': '0' }
      : { 'margin-right': '-17px', 'margin-left': '0' };
  }

  checkboxStyleAll(direction: any): any {
    return direction === 'ltr'
      ? { 'margin-left': '-10px', 'margin-right': '0' }
      : { 'margin-right': '-16px', 'margin-left': '0' };
  }

  getParentStyleField(element: GridColumn): { [key: string]: string } {
    const style: any = { whiteSpace: 'nowrap' };
    if (element.width) { style.width = element.width; }
    if (element.align) { style.textAlign = element.align; }
    if (element.direction) { style.direction = element.direction; }
    if (element.font) { Object.assign(style, CustomGridComponent.extractFontStyle(element.font)); }
    else if (this.gridJson?.title?.font) { Object.assign(style, CustomGridComponent.extractFontStyle(this.gridJson.title.font)); }
    return style;
  }

  getParentStyleFieldHeader(element: any): any {
    const style: any = { whiteSpace: 'nowrap' };
    if (element.width) { style.width = element.width; }
    if (element.align) { style.textAlign = element.align; }
    if (element.direction) { style.direction = element.direction; }
    if (element.titleAlign) { style.titleAlign = element.titleAlign; }

    if (element.hasOwnProperty('bold')) {
      if (element.size) { style.fontSize = element.size + 'px'; }
      if (element.bold) { style.fontWeight = 'bold'; }
      if (element.italic) { style.fontStyle = 'italic'; }
      if (element.name) { style.fontFamily = element.name; }
      if (element.titleColor) { style.color = element.titleColor; }
      if (element.textAlign) { style.titleAlign = element.titleAlign; }
      return style;
    }
    if (element.font) {
      Object.assign(style, CustomGridComponent.extractFontStyle(element.font));
      if (element.font.titleColor) { style.color = element.font.titleColor; }
      return style;
    }
    if (this.gridJson?.title?.font) {
      if (element.titleColor) { style.color = element.titleColor; }
      Object.assign(style, CustomGridComponent.extractFontStyle(this.gridJson.title.font));
      return style;
    }
    return style;
  }

  getMarginStyle(col: any): any {
    if (!col.sort) { return {}; }
    if (col.direction === 'ltr' || (!col.direction && this.gridJson.direction === 'ltr')) {
      return { 'margin-left': '29px', 'margin-right': '0' };
    }
    return { 'margin-right': '29px', 'margin-left': '0' };
  }

  toggleAllSelection(event: MatCheckboxChange): void {
    const checked = event.checked;
    this.gridJson.data.forEach((row: any) => (row.selected = checked));
    this.onSelectionChange();
  }

  onSelectionChange(): void {
    const selectedRows = this.gridJson.data.filter((row: any) => row.selected);
    this.selectionChanged.emit(selectedRows);
  }

  sortData(field: any): void {
    if (!field.sort || !field.fieldName) { return; }
    this.gridJson.columns.forEach((col: any) => {
      if (col !== field) { col.sortDirection = null; }
    });
    field.sortDirection = field.sortDirection === 'asc' ? 'desc' : 'asc';
    this.gridJson.sortColumn = field.fieldName;
    this.gridJson.sortAscending = field.sortDirection === 'asc';
    const dir = this.gridJson.sortAscending ? 1 : -1;
    this.gridJson.data = [...this.gridJson.data].sort((a: any, b: any) => {
      const aVal = a[field.fieldName];
      const bVal = b[field.fieldName];
      if (aVal == null) {
        return 1;
      }
      if (bVal == null) {
        return -1;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * dir;
      }
      return aVal > bVal ? dir : aVal < bVal ? -dir : 0;
    });
  }
// @ts-ignore
  showButton(btn: GridColumn['buttons'][number], row: any): boolean {
    const key = btn?.type;
    if (!key) return true;
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      return !!row[key];
    }
    return true;
  }

  /** --- Private Methods --- */

  private updateHeights(): void {
    let titleHeight = 0;
    if (this.gridJson?.title?.text) {
      titleHeight = (this.gridJson.title.height ?? 50) + 20;
    }
    this.heightGrid = window.innerHeight - 600;
    this.heightContainer = window.innerHeight - this.heightContainerInput;
  }
}

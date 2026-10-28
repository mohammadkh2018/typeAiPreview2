import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectComponent),
      multi: true
    }
  ]
})
export class SearchableSelectComponent implements OnInit , OnChanges {
  @Input() label!: string;
  @Input() formControl!: FormControl;
  @Input() data: any[] = [];
  @Input() valueKey: string = 'valueKey';
  @Input() value: string = 'value';
  @Output() valueChange = new EventEmitter<any>();

  filteredList: any[] = [];
  panelOpenState = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['data'] && changes?.['data'].currentValue) {
      this.filteredList = [...(this.data || [])];

      const matched = this.data.find(item => item[this.valueKey] === this.value);
      if (matched) {
        this.formControl.setValue(matched[this.valueKey]);
      }
    }
  }

  onDropdownOpen(open: boolean, inputEl?: HTMLInputElement): void {
    this.panelOpenState = open;
    if (open) {
      this.filteredList = [...this.data];
      setTimeout(() => inputEl?.focus(), 0);
    }
  }

  normalizePersian(text: string): string {
    return text.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
  }

  filterList(text: string): void {
    const searchText = this.normalizePersian((text || '').toLowerCase().trim());

    this.filteredList = this.data.filter(item => {
      console.log(item , ' item ');
      const itemText = this.normalizePersian(item.title?.toLowerCase() || '');
      return itemText.includes(searchText);
    });
  }

  compareFn = (a: any, b: any): boolean => {
    return a && b && a.toString() === b.toString();
  }

  onSelectChange(value: any): void {
    this.valueChange.emit(value);
    this.onChange(value);
  }

  onChange = (_: any) => {};
  onTouched = () => {};


  writeValue(value: any): void {
    if (value !== undefined && this.formControl.value !== value) {
      this.formControl.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}

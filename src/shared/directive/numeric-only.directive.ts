import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appNumericOnly], textarea[appNumericOnly]',
  standalone: false
})
export class NumericOnlyDirective {
  @Input() decimals: number | string = 0;           // تعداد اعشار مجاز
  @Input() allowNegative: boolean | string = false; // اجازه منفی
  @Input() min?: number | string;                   // حداقل
  @Input() max?: number | string;                   // حداکثر
  @Input() padZeros: boolean | string = false;      // اجباری‌کردن صفرهای اعشار (پیش‌فرض: خاموش)

  private readonly decimalPoints = ['.', ',', '٫'];
  private readonly thousandSeparators = ['٬'];

  constructor(
    private el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() private ngControl: NgControl
  ) {}

  // —— Helpers ——
  private toNum(v: any): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  private getDecimals(): number {
    const d = Number(this.decimals);
    return Number.isFinite(d) && d > 0 ? Math.floor(d) : 0;
  }
  private getAllowNegative(): boolean {
    const raw = this.allowNegative;
    if (raw === '' || raw === true || raw === 'true') return true;
    const mn = this.toNum(this.min);
    if (mn != null && mn < 0) return true;
    return false;
  }
  private getPadZeros(): boolean {
    const p = this.padZeros;
    return p === '' || p === true || p === 'true';
  }

  private faDigitsToEn(s: string): string {
    return (s || '')
      .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  }

  private normalizeNumericRaw(raw: any): string {
    if (raw == null) return '';
    let s = String(raw);
    for (const t of this.thousandSeparators) s = s.split(t).join('');
    s = this.faDigitsToEn(s);
    for (const p of this.decimalPoints) s = s.split(p).join('.');
    return s;
  }

  /** فقط رقم، یک نقطه اعشار، و یک «-» ابتدای رشته؛ با محدودیت اعشار */
  private sanitizeNumericString(raw: string, allowNeg: boolean, decimals: number): string {
    let v = this.normalizeNumericRaw(raw);

    v = v.replace(/[^0-9\.\-]/g, '');

    if (!allowNeg) {
      v = v.replace(/\-/g, '');
    } else {
      const negCount = (v.match(/\-/g) || []).length;
      if (negCount > 1) v = '-' + v.replace(/\-/g, '');
      if (v.length > 0 && v.indexOf('-') > 0) v = '-' + v.replace(/\-/g, '');
    }

    const firstDot = v.indexOf('.');
    if (firstDot > -1) {
      v = v.substring(0, firstDot + 1) + v.substring(firstDot + 1).replace(/\./g, '');
    }

    if (decimals <= 0) {
      v = v.replace(/\./g, '');
    } else if (firstDot > -1) {
      const parts = v.split('.');
      parts[1] = (parts[1] ?? '').slice(0, decimals);
      v = parts[0] + '.' + parts[1];
    }

    if (allowNeg && v === '-') return v;
    if (v === '.' || v === '-.') return v;

    return v;
  }

  private roundToDecimals(x: number, d: number): number {
    if (!Number.isFinite(x)) return x;
    if (d <= 0) return Math.trunc(x);
    const f = Math.pow(10, d);
    return Math.round(x * f) / f;
  }

  private stripTrailingZeros(s: string): string {
    if (!s.includes('.')) return s;
    // حذف صفرهای اضافی انتهای اعشار و نقطه‌ی تنها
    return s.replace(/(\.\d*?[1-9])0+$/,'$1').replace(/\.$/, '');
  }

  /**
   * کلمپ min/max و رُندکردن بدون پَدینگ صفر
   * اگر padZeros=true باشد مثل قبل toFixed انجام می‌شود.
   */
  private clampAndFormat(value: string): string {
    const decimals = this.getDecimals();
    const min = this.toNum(this.min);
    const max = this.toNum(this.max);
    const pad = this.getPadZeros();

    let num = Number(value);
    if (!Number.isFinite(num)) return value;

    if (min != null) num = Math.max(num, min);
    if (max != null) num = Math.min(num, max);

    if (decimals <= 0) {
      return String(Math.trunc(num));
    }

    if (pad) {
      // حالت قبلی: صفرها پَد می‌شوند
      return num.toFixed(decimals);
    }

    // رُند کن ولی صفر اضافه نکن
    const rounded = this.roundToDecimals(num, decimals);
    return this.stripTrailingZeros(String(rounded));
  }

  private setNativeAndControl(v: string, emit = false) {
    const native = this.el.nativeElement as HTMLInputElement;
    if (native.value === v) return;

    const cursor = native.selectionStart ?? v.length;
    native.value = v;

    if (this.ngControl?.control) {
      this.ngControl.control.setValue(v, { emitEvent: emit });
    }
    try { native.setSelectionRange(cursor, cursor); } catch {}
  }

  // —— Listeners ——
  @HostListener('input', ['$event'])
  onInput(ev: Event) {
    const native = ev.target as HTMLInputElement;
    const cleaned = this.sanitizeNumericString(
      native.value,
      this.getAllowNegative(),
      this.getDecimals()
    );
    if (cleaned !== native.value) {
      this.setNativeAndControl(cleaned, false);
    }
  }

  @HostListener('blur')
  onBlur() {
    const native = this.el.nativeElement as HTMLInputElement;
    let v = native.value;

    if (v === '-' || v === '.' || v === '-.') {
      this.setNativeAndControl('', true);
      return;
    }

    v = this.clampAndFormat(v);
    this.setNativeAndControl(v, true);
  }
}
